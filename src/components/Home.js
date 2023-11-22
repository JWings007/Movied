import React, { useEffect, useState } from "react";
import Tails from "./Tails";
import Footer from "./Footer";
import { apis } from "../api/apiFatcher";
import { redirect, useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";

function Home() {
  const [randomM, setRandomM] = useState({});
  const [randomId, setRandomId] = useState(575264);
  const [movieCast, setMovieCast] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchMovieResults, setSearchMovieResults] = useState([]);
  const [searchTvResults, setSearchTvResults] = useState([]);
  const [movieVideo, setMovieVideo] = useState("");
  const [loaderWidth, setLoaderWidth] = useState(0);
  const [type, setType] = useState("movie");
  const navigate = useNavigate();
  const randomNumber = Math.floor(Math.random() * 11);
  const hamMenu = document.querySelector(".ham-container");
  const tvList = [
    {
      type: "airing_today",
      title: "Airing today",
      category: "tv",
    },
    {
      type: "on_the_air",
      title: "On the air",
      category: "tv",
    },
    {
      type: "popular",
      title: "Popular",
      category: "tv",
    },
    {
      type: "top_rated",
      title: "Top rated",
      category: "tv",
    },
  ];

  const movieList = [
    {
      type: "now_playing",
      title: "Now playing",
      category: "movie",
    },
    {
      type: "popular",
      title: "Popular",
      category: "movie",
    },
    {
      type: "top_rated",
      title: "Top rated",
      category: "movie",
    },
    {
      type: "upcoming",
      title: "Upcoming",
      category: "movie",
    },
  ];

  useEffect(() => {
    const movieBtn = document.querySelector(".movie-btn");
    const tvBtn = document.querySelector(".tv-btn");
    const slider = document.querySelector(".slider");

    tvBtn.addEventListener("click", function () {
      slider.style.left = "50%";
      tvBtn.style.color = "black";
      movieBtn.style.color = "white";
    });
    movieBtn.addEventListener("click", function () {
      slider.style.left = "0";
      tvBtn.style.color = "white";
      movieBtn.style.color = "black";
    });
    setLoaderWidth(30);
    apis.fatchTails("movie", "popular").then((Response) => {
      setLoaderWidth(50);
      setRandomM(Response.results[randomNumber]);
      setRandomId(Response.results[randomNumber].id);
      setLoaderWidth(100);
    });
  }, [Response.results]);

  useEffect(() => {
    const loader = document.querySelector(".loader");
    setInterval(() => {
      loader.style.width == "100%"
        ? (loader.style.display = "none")
        : (loader.style.display = "block");
    }, 1000);
  }, [loaderWidth]);

  useEffect(() => {
    apis.fatchCrew("movie", randomId).then((Response) => {
      setMovieCast(Response.cast);
    });
    apis.fatchVideo("movie", randomId).then((Response) => {
      setMovieVideo(
        Response.results.length != 0
          ? Response.results.filter((v) => {
              return v.type == "Trailer";
            })[0]?.key
          : "WMweEpGlu_U"
      );
    });
  }, [randomId]);

  useEffect(() => {
    apis.fatchSearch("movie", searchText).then((Response) => {
      setSearchMovieResults(Response.results);
    });
    apis.fatchSearch("tv", searchText).then((Response) => {
      setSearchTvResults(Response.results);
    });
  }, [searchText]);

  return (
    <div className="main">
      <div className="full-image-container">
        <span>
          <i
            className="fa-regular fa-circle-xmark"
            onClick={() => {
              const container = document.querySelector(".full-image-container");
              container.style.display = "none";
            }}
          ></i>
        </span>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${movieVideo}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          id="video-main"
          style={{}}
        ></iframe>
      </div>
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <h2>MOVIED</h2>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Movies, TV Shows..."
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
        <i
          className="fa-solid fa-bars"
          id="ham-icon"
          onClick={() => {
            hamMenu.classList.toggle("close");
          }}
        ></i>

        <div className="main-toggle">
          <button
            className="movie-btn"
            onClick={() => {
              setType("movie");
            }}
          >
            MOVIES
          </button>
          <button
            className="tv-btn"
            onClick={() => {
              setType("tv");
            }}
          >
            TV SHOWS
          </button>
          <span className="slider"></span>
        </div>
        <select
          name="languages"
          id="lang"
          onChange={(e) => navigate(`/${type}/${e.target.value}/list`)}
        >
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          {type == "movie"
            ? movieList.map((opt, i) => {
                return (
                  <option value={opt.type} key={i}>
                    {opt.title}
                  </option>
                );
              })
            : tvList.map((opt, i) => {
                return (
                  <option value={opt.type} key={i}>
                    {opt.title}
                  </option>
                );
              })}
        </select>
        <SearchResults movie={searchMovieResults} tv={searchTvResults} />
        <div className="ham-container">
          <h1>Movies</h1>
          {movieList?.map((m, i) => {
            return (
              <p key={i} onClick={() => navigate(`/movie/${m.type}/list`)}>
                {m.title}
              </p>
            );
          })}
          <h1>Tv shows</h1>
          {tvList?.map((m, i) => {
            return (
              <p key={i} onClick={() => navigate(`/tv/${m.type}/list`)}>
                {m.title}
              </p>
            );
          })}
        </div>
        <div className="loader" style={{ width: `${loaderWidth}%` }}></div>
      </div>
      <div className="hero-section">
        <img
          src={
            "https://www.themoviedb.org/t/p/w533_and_h300_bestv2" +
            randomM?.backdrop_path
          }
          alt=""
          className="hero-backdrop"
        />
        <div className="movie-details">
          <div className="hero-main-catagory">
            <div className="hero-catagory">
              <h1>MOVIE</h1>
            </div>
            <div className="hero-ageR">
              <h1>U/A 16+</h1>
            </div>
          </div>

          <h1
            className="hero-title"
            onClick={() => navigate(`/movie/${randomM.id}`)}
          >
            {randomM?.original_title}
          </h1>
          <span className="s-title"></span>

          <div className="hero-main-details">
            <span className="release-date">{randomM?.release_date}</span>
            <span className="running-time">2hr 30mins</span>
            <span className="genere">Action</span>
            <div className="s-extra-main">
              <span className="s-extra"></span>
              <span className="s-extra"></span>
              <span className="s-extra"></span>
            </div>
          </div>

          <p className="hero-description">{randomM?.overview}</p>
          <div className="s-despn">
            <div className="s-line"></div>
            <div className="s-line"></div>
            <div className="s-line"></div>
            <div className="s-line"></div>
            <div className="s-line-half"></div>
          </div>
          <div className="hero-btns">
            <span>
              <button
                className="hero-trailer-btn"
                onClick={() => {
                  const container = document.querySelector(
                    ".full-image-container"
                  );
                  const containerImg = document.querySelector("#video-main");
                  container.style.display = "flex";
                  containerImg.style.width = "70%";
                  containerImg.style.height = "80%";
                }}
              >
                Watch trailer
              </button>
            </span>
            <span>
              <button className="hero-more-btn">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </span>
          </div>
          <h2 className="starring">Starring</h2>
          <div className="hero-cast">
            {movieCast.slice(0, 4).map((c, i) => {
              return (
                <div
                  className="cast"
                  key={i}
                  onClick={() => {
                    navigate(`/person/${c.id}`);
                  }}
                >
                  <img
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${c.profile_path}`}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="poster">
          <img
            src={
              "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
              randomM?.poster_path
            }
            alt=""
          />
        </div>
      </div>
      {(type == "movie" ? movieList : tvList).map((show, i) => {
        return (
          <Tails
            key={i}
            catagory={show.category}
            type={show.type}
            title={show.title}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default Home;
