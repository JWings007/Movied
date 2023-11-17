import React, { useEffect, useState } from "react";
import Star from "../star.png";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { apis } from "../api/apiFatcher";
import Footer from "./Footer";

function List() {
  const parameters = useParams();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState(1);
  const [mainPageLength, setMainPageLength] = useState(1);
  const naviagte = useNavigate();
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
    apis
      .fatchList(parameters.category, parameters.type, page)
      .then((Response) => {
        setList(Response.results);
        if (page == 1) setPageLength(Response.total_pages);
        setMainPageLength(Response.total_pages);
      });
  }, [parameters.category, parameters.type, page]);
  return (
    <>
      <Navbar />
      <div className="list-container">
        <h1>
          {parameters.category == "movie"
            ? movieList.map((m) => {
                return m.type == parameters.type ? m.title : "";
              })
            : tvList.map((m) => {
                return m.type == parameters.type ? m.title : "";
              })}
        </h1>
        <div className="list-wrapper">
          {list?.map((item, i) => {
            return (
              <div
                className="list-movie"
                key={i}
                onClick={() => {
                  naviagte(`/${parameters.category}/${item.id}`);
                }}
              >
                <img
                  className="list-img"
                  src={
                    item.poster_path != null
                      ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item?.poster_path}`
                      : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTFWqGkkXBqdvmeoskwgCLV-sAZd6yWGys6fhM6O82pkWbPBpzq"
                  }
                  alt=""
                />
                <h2>{item?.title || item?.name}</h2>
                <div className="list-movie-rating">
                  <img className="rating-img" src={Star} alt="" />
                  <p>{item?.vote_average}/10</p>
                </div>
                <p className="list-p">
                  {item?.release_date || item?.first_air_date}
                </p>
              </div>
            );
          })}
        </div>
        <div className="load-more">
          <p>Page no: {page}</p>
          <button
            className="load-more-btn"
            onClick={() => {
              setPage(page - 1);
              setPageLength(pageLength + 1);
            }}
            style={{ display: page == 1 ? "none" : "block" }}
          >
            Previous
          </button>
          <button
            className="load-more-btn"
            onClick={() => {
              setPage(page + 1);
              setPageLength(pageLength - 1);
            }}
            style={{ display: page == mainPageLength ? "none" : "block" }}
          >
            Next
          </button>
          <p>Remaining pages: {pageLength == 1 ? 0 : pageLength}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default List;
