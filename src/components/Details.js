import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Star from "../star.png";
import { useNavigate, useParams } from "react-router-dom";
import { apis } from "../api/apiFatcher";
import ImageViewer from "./ImageViewer";
import Tails from "./Tails";

function Details() {
  const [movie, setMovie] = useState({});
  const [movieGenre, setMovieGenre] = useState([]);
  const [movieCrew, setMovieCrew] = useState({});
  const [movieCast, setMovieCast] = useState([]);
  const [movieBackdrops, setMovieBackdrops] = useState([]);
  const [moviePosters, setMoviePosters] = useState([]);
  const [movieVideo, setMovieVideo] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [clickedImage, setClickedImage] = useState("");

  let mId = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      apis.fatchDetails(mId.categ, mId.id).then((Response) => {
        setMovie(Response);
        setMovieGenre(Response.genres);
      });
      apis.fatchCrew(mId.categ, mId.id).then((Response) => {
        setMovieCast(Response.cast);
        setMovieCrew(
          Response.crew.filter((crew) => {
            return crew.job == "Director";
          })
        );
      });
      apis.fatchImage(mId.categ, mId.id).then((Response) => {
        setMovieBackdrops(Response.backdrops);
        setMoviePosters(Response.posters);
      });
      apis.fatchKeywords(mId.categ, mId.id).then((Response) => {
        setKeywords(Response.keywords || Response.results);
      });
      apis.fatchVideo(mId.categ, mId.id).then((Response) => {
        setMovieVideo(
          Response.results.length != 0
            ? Response.results.filter((v) => {
                return v.type == "Trailer";
              })[0]?.key
            : "WMweEpGlu_U"
        );
      });
    } catch (error) {
      console.log("Error triggered");
    }
    window.scrollTo(0, 0);
  }, [mId.id, mId.categ]);

  function convertMinutes(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;

    return hours + "hr " + remainingMinutes + "mins";
  }

  return (
    <>
      <Navbar />
      <div className="details-container">
        <ImageViewer src={clickedImage} />
        <div className="img-container">
          <img
            className="detail-img"
            src={movie?.backdrop_path == null?"https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-042.jpg":`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}`}
            alt=""
          />
          <img
            className="main-poster"
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`}
            alt=""
          />
        </div>
        <div className="movie-details-main">
          <div className="detail-head">
            <h1>{movie?.original_title || movie.name}</h1>
          </div>
          {mId.categ != "tv" ? (
            <div className="detail">
              <p className="p-main">RUNTIME</p>
              <p>{convertMinutes(movie.runtime)}</p>
            </div>
          ) : null}

          <div className="detail">
            <p className="p-main">GENRE</p>
            <p>
              {movieGenre.map((element, i) => {
                if (i < movieGenre.length - 1) return element.name + ", ";
                else return element.name + ".";
              })}
            </p>
          </div>
          {mId.categ == "movie" ? (
            <div className="detail">
              <p className="p-main">RELESE DATE</p>
              <p>{movie.release_date}</p>
            </div>
          ) : (
            <div className="detail">
              <p className="p-main">FIRST AIR DATE</p>
              <p>{movie.first_air_date}</p>
            </div>
          )}

          <div className="detail">
            <span>
              <img className="star-img" src={Star} alt="" />
            </span>
            <p style={{ color: movie.vote_average > 8 ? "#29ff62" : "yellow" }}>
              {movie.vote_average} / 10
            </p>
          </div>
        </div>
        <div className="main-details">
          <div className="description">
            <h2>Description</h2>
            <p>{movie.overview}</p>
            <span className="span-head">Director : </span>
            <span className="gold-text">{movieCrew[0]?.name}</span>
            <br />
            <span className="span-head">Production companies : </span>
            <span className="gold-text">
              {movie.production_companies &&
                movie.production_companies.map((c, i) => {
                  if (i < movie.production_companies.length - 1)
                    return c.name + ", ";
                  else return c.name + ".";
                })}
            </span>
            <br />
            <div className="main-divider"></div>
            <div className="main-gallery">
              <h1>Gallery</h1>
              <div className="gallery-img">
                {movieBackdrops.slice(0, 7).map((image, i) => {
                  return (
                    <img
                      src={`https://www.themoviedb.org/t/p/original${image.file_path}`}
                      alt=""
                      key={i}
                      onClick={() => {
                        setClickedImage(
                          `https://www.themoviedb.org/t/p/original${image.file_path}`
                        );
                        const container = document.querySelector(
                          ".full-image-container"
                        );
                        const containerImg =
                          document.querySelector("#view-img");
                        container.style.display = "flex";
                        containerImg.style.maxWidth = "900px";
                      }}
                    />
                  );
                })}

                <a onClick={() => navigate("images/backdrops")}>View all</a>
              </div>
            </div>
          </div>
          <div className="main-casts">
            <h1>Cast</h1>
            {movieCast.slice(0, 4).map((crew, i) => {
              return (
                <div
                  className="main-cast"
                  key={i}
                  onClick={() => navigate(`/person/${crew.id}`)}
                >
                  <img
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${crew.profile_path}`}
                    alt=""
                  />
                  <p>{crew.original_name}</p>
                </div>
              );
            })}

            <div className="see-all">
              <a
                onClick={() => {
                  navigate(`/${mId.categ}/${mId.id}/credits`);
                }}
              >
                See full cast
              </a>
            </div>
          </div>
        </div>
        <div className="trailer-main">
          <h1>Trailer</h1>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movieVideo}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="other-main-details">
          {mId.categ == "movie" ? (
            <div className="tech-details">
              <div className="tech-details-1">
                <h1>Technical Details</h1>
                <span className="span-head">Language : </span>
                <span className="gold-text">
                  {movie.original_language?.toUpperCase()}
                </span>
                <br />
                <span className="span-head">Release date : </span>
                <span className="gold-text">{movie.release_date}</span>
                <br />
                <span className="span-head">Original title : </span>
                <span className="gold-text">{movie?.original_title}</span>
              </div>
              <div className="main-divider"></div>
              <div className="tech-details-2">
                <h1>Box office</h1>
                <span className="span-head">Budget : </span>
                <span className="gold-text">{movie?.budget + "$"}</span>
                <br />
                <span className="span-head">Revenue : </span>
                <span className="gold-text">{movie?.revenue + "$"}</span>
              </div>
              <div className="tech-details-3">
                <h1>Keywords</h1>
                {keywords?.map((key, i) => {
                  return <p key={i}>{key.name}</p>;
                })}
              </div>
            </div>
          ) : (
            <div className="tech-details">
              <h1>Details</h1>
              <span className="span-head">First air date : </span>
              <span className="gold-text">{movie?.first_air_date}</span>
              <br />
              <span className="span-head">Last air date : </span>
              <span className="gold-text">{movie?.last_air_date}</span>
              <br />
              <span className="span-head">Total seasons : </span>
              <span className="gold-text">{movie?.number_of_seasons}</span>
              <br />
              <span className="span-head">Total episodes : </span>
              <span className="gold-text">{movie?.number_of_episodes}</span>
              <br />
              <span className="span-head">Last episode to air : </span>
              <span className="gold-text">
                {movie?.last_episode_to_air?.name}
              </span>
              <br />
              <h1>Seasons</h1>
              <div className="seasons-container">
                {movie?.seasons?.slice(0, 5)?.map((s, i) => {
                  return (
                    <div className="season" key={i}>
                      <img
                        src={
                          s.poster_path != null
                            ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${s?.poster_path}`
                            : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTFWqGkkXBqdvmeoskwgCLV-sAZd6yWGys6fhM6O82pkWbPBpzq"
                        }
                        alt=""
                      />
                      <p>{s.name}</p>
                      <div className="season-rating">
                        <img src={Star} alt="" />
                        <p>{s?.vote_average}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="tech-details-3">
                <h1>Keywords</h1>
                {keywords?.map((key, i) => {
                  return <p key={i}>{key.name}</p>;
                })}
              </div>
            </div>
          )}

          <div className="more-posters">
            <h1>Posters</h1>
            <div className="poster-collection">
              {moviePosters.slice(0, 7).map((image, i) => {
                return (
                  <img
                    src={`https://www.themoviedb.org/t/p/original${image.file_path}`}
                    key={i}
                    alt=""
                    onClick={() => {
                      setClickedImage(
                        `https://www.themoviedb.org/t/p/original${image.file_path}`
                      );
                      const container = document.querySelector(
                        ".full-image-container"
                      );
                      const containerImg = document.querySelector("#view-img");
                      container.style.display = "flex";
                      containerImg.style.maxWidth = "400px";
                    }}
                  />
                );
              })}
              <div className="more-poster-anchor">
                <a onClick={() => navigate("images/posters")}>View all</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tails
        catagory={mId.categ}
        id={mId.id}
        type={"recommendations"}
        title={"Recommendations"}
      />
      <Footer />
    </>
  );
}

export default Details;
