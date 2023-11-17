import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { apis } from "../api/apiFatcher";
import { useNavigate, useParams } from "react-router-dom";
import crewUnknown from "../crewUnknown.png";

function CrewInfo() {
  const cid = useParams();
  const naviagte = useNavigate();
  const [crew, setCrew] = useState({});
  useEffect(() => {
    apis.fatchCrew(cid.category, cid.id).then((Response) => {
      setCrew(Response);
    });
  }, [cid.category, cid.id]);
  return (
    <>
      <Navbar />
      <div className="cast-container">
        <h1 className="cast-head">Cast</h1>
        <div className="movie-list-container">
          {crew?.cast?.map((c, i) => {
            return (
              <div
                className="movie"
                key={i}
                onClick={() => {
                  naviagte(`/person/${c.id}`);
                }}
              >
                <img
                  src={
                    c?.profile_path != null
                      ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${c?.profile_path}`
                      : crewUnknown
                  }
                  alt=""
                />
                <h1>{c.name}</h1>
                <p>{c?.character}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="crew-container">
        <h1 className="crew-head">Crew</h1>
        <div className="movie-list-container">
          {crew?.crew?.map((c, i) => {
            return (
              <div
                className="movie"
                key={i}
                onClick={() => {
                  naviagte(`/person/${c.id}`);
                }}
              >
                <img
                  src={
                    c?.profile_path != null
                      ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${c?.profile_path}`
                      : crewUnknown
                  }
                  alt=""
                />
                <h1>{c.name}</h1>
                <p>{c?.job}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CrewInfo;
