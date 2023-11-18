import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchResults(props) {
  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setMovie(props.movie);
    setTv(props.tv);
  }, [props]);

  return (
    <div
      className="search-results"
      style={{ display: movie?.length && tv?.length > 0 ? "flex" : "none" }}
    >
      {movie?.slice(0, 10)?.map((m, i) => {
        return (
          <div
            className="result"
            key={i}
            onClick={() => navigate(`/movie/${m.id}`)}
          >
            <div className="result-1">
              <p>{m?.title}</p>
              <span className="result-date">{m?.release_date}</span>
            </div>
            <div className="result-2">
              <span className="result-type">
                In movies <i className="fa-solid fa-film"></i>
              </span>
              <span className="result-language">
                Language:{" "}
                <span className="la">
                  {m?.original_language?.toUpperCase()}
                </span>
              </span>
            </div>
          </div>
        );
      })}
      {tv?.slice(0, 10)?.map((m, i) => {
        return (
          <div
            className="result"
            key={i}
            onClick={() => navigate(`/tv/${m.id}`)}
          >
            <div className="result-1">
              <p>{m?.name}</p>
              <span className="result-date">{m?.first_air_date}</span>
            </div>
            <div className="result-2">
              <span className="result-type">
                In Tv series <i className="fa-solid fa-tv"></i>
              </span>
              <span className="result-language">
                Language:{" "}
                <span className="la">
                  {m?.original_language?.toUpperCase()}
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;
