import React, { useState, useEffect } from "react";
import { apis } from "../api/apiFatcher";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [searchText, setSearchText] = useState("");
  const [searchMovieResults, setSearchMovieResults] = useState([]);
  const [searchTvResults, setSearchTvResults] = useState([]);
  const [type, setType] = useState("movie");
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
  useEffect(()=> {
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
  }, [])
  return (
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
    </div>
  );
}

export default Navbar;
