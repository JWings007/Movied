import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Tails from "./Tails";
import { useParams } from "react-router-dom";
import crewUnknown from "../crewUnknown.png";
import { apis } from "../api/apiFatcher";

function Person() {
  const [person, setPerson] = useState({});
  const [extId, setExtId] = useState({});
  const [readMore, setReadMore] = useState(false);
  const [personVideo, setPersonVideo] = useState([]);
  const personId = useParams();
  useEffect(() => {
    apis.fatchPerson(personId.pid).then((Response) => {
      setPerson(Response);
    });
    apis.fatchPersonLinks(personId.pid).then((Response) => {
      setExtId(Response);
    });
    apis.fatchKnownFor(personId.pid).then((Response) => {
      setPersonVideo(Response.cast);
    });
    window.scrollTo(0, 0);
  }, [personId.pid]);
  return (
    <>
      <Navbar />
      <div className="person-container">
        <div className="main-person-container">
          <img
            src={
              person?.profile_path != null
                ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${person?.profile_path}`
                : crewUnknown
            }
            alt=""
          />
          <div className="person-details">
            <h1>{person?.name}</h1>
            <h2>Biography</h2>
            <p>
              {person?.biography?.slice(0, 900)}
              {
                <span
                  className="read-more"
                  style={{ display: readMore ? "inline" : "none" }}
                >
                  {person?.biography?.slice(900, person?.biography.length)}
                </span>
              }
              <a
                onClick={() => {
                  setReadMore(true);
                }}
              >
                {" "}
                {readMore || person?.biography?.length < 900
                  ? ""
                  : "Read more..."}
              </a>
            </p>
            <h2>Personal information</h2>
            <div className="person-personal-info">
              <div className="info">
                <h3>Birthday</h3>
                <p className="gold-text">
                  {person?.birthday == null ? "-" : person?.birthday}
                </p>
              </div>
              <div className="info">
                <h3>Known for</h3>
                <p className="gold-text">
                  {person?.known_for_department == null
                    ? "-"
                    : person?.known_for_department}
                </p>
              </div>
              <div className="info">
                <h3>Birth place</h3>
                <p className="gold-text">
                  {person?.place_of_birth == null
                    ? "-"
                    : person?.place_of_birth}
                </p>
              </div>
              <div className="info">
                <h3>Gender</h3>
                <p className="gold-text">
                  {person?.gender == 2 ? "Male" : "Female"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="other-person-info">
          <div className="other-person-info-1">
            <h2>Other names</h2>
            {person?.also_known_as?.length == 0 ? (
              <p>-</p>
            ) : (
              person?.also_known_as?.map((name, i) => {
                return <p key={i}>{name}</p>;
              })
            )}
          </div>
          <div className="other-person-info-2">
            <h2>External links</h2>
            <div className="links">
              <div
                className="twitter"
                style={{
                  display: extId?.twitter_id == null ? "none" : "block",
                }}
              >
                <a
                  href={`https://twitter.com/${extId?.twitter_id}`}
                  target="_blank"
                >
                  <i class="fa-brands fa-square-x-twitter"></i>
                </a>
              </div>
              <div
                className="facebook"
                style={{
                  display: extId?.facebook_id == null ? "none" : "block",
                }}
              >
                <a
                  href={`https://www.facebook.com/${extId?.facebook_id}`}
                  target="_blank"
                >
                  <i class="fa-brands fa-square-facebook"></i>
                </a>
              </div>
              <div
                className="instagram"
                style={{
                  display: extId?.instagram_id == null ? "none" : "block",
                }}
              >
                <a
                  href={`https://www.instagram.com/${extId?.instagram_id}`}
                  target="_blank"
                >
                  <i className="fa-brands fa-square-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tails array={personVideo} title={"Known for"} type={"known_for"} />
        </div>
      </div>
    </>
  );
}

export default Person;
