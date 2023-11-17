import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { apis } from "../api/apiFatcher";
import ImageViewer from "./ImageViewer";

function PosterList() {
  const [moviePosters, setMoviePosters] = useState([]);
  const [clickedImage, setClickedImage] = useState("");

  const movie = useParams();
  useEffect(() => {
    apis.fatchImage(movie.category, movie.id).then((Response) => {
      setMoviePosters(Response.posters);
    });
  }, [movie.category, movie.id]);
  return (
    <>
      <Navbar />
      <ImageViewer src={clickedImage} />
      <div className="image-list-container">
        <h1>Posters</h1>
        <div className="image-list-wrapper">
          {moviePosters?.map((image, i) => {
            return (
              <img
                src={`https://www.themoviedb.org/t/p/original${image?.file_path}`}
                alt=""
                key={i}
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PosterList;
