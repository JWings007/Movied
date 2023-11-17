import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { apis } from "../api/apiFatcher";
import ImageViewer from "./ImageViewer";

function BackdropList() {
  const [movieBackdrops, setMovieBackdrops] = useState([]);
  const [clickedImage, setClickedImage] = useState("");

  const movie = useParams();
  useEffect(() => {
    apis.fatchImage(movie.category, movie.id).then((Response) => {
      setMovieBackdrops(Response.backdrops);
    });
  }, [movie.category, movie.id]);
  return (
    <>
      <Navbar />
      <ImageViewer src={clickedImage} />
      <div className="image-list-container">
        <h1>Backdrops</h1>
        <div className="image-list-wrapper">
          {movieBackdrops?.map((image, i) => {
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
                  container.style.display = "flex";
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

export default BackdropList;
