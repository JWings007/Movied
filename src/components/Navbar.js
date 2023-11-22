import React, { useState, useEffect } from "react";
import { apis } from "../api/apiFatcher";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const [searchText, setSearchText] = useState("");
  const [searchMovieResults, setSearchMovieResults] = useState([]);
  const [searchTvResults, setSearchTvResults] = useState([]);
  const [type, setType] = useState("movie");
  const hamMenu = document.querySelector(".ham-container");
  const navigate = useNavigate();
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
    apis.fatchSearch("movie", searchText).then((Response) => {
      setSearchMovieResults(Response.results);
    });
    apis.fatchSearch("tv", searchText).then((Response) => {
      setSearchTvResults(Response.results);
    });
  }, [searchText]);
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
  }, []);

  useEffect(() => {
    const loader = document.querySelector(".loader-navbar");
    setInterval(() => {
      loader.style.width == "100%"
        ? (loader.style.display = "none")
        : (loader.style.display = "block");
    }, 1500);
  }, [props.loaderWidth]);
  return (
    <>
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <h2>MOVIED</h2>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Movies, TV Shows..."
            onChange={(e) => {
              const searchR = document.querySelector(".search-results");
              searchR.style.display = "block";
              setSearchText(e.target.value);
            }}
            id="main-searchbox"
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
        <div
          className="loader-navbar"
          style={{ width: `${props.loaderWidth}%` }}
        ></div>
      </div>
    </>
  );
}

export default Navbar;
