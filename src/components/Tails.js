import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { apis } from "../api/apiFatcher";

function Tails(props) {
  const [mdata, setMdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.type == "recommendations") {
      apis.fatchRecommendation(props.catagory, props.id).then((response) => {
        setMdata(response.results);
      });
    } else if (props.type == "known_for") {
      setMdata(props?.array);
    } else {
      apis.fatchTails(props.catagory, props.type).then((response) => {
        setMdata(response.results);
      });
    }
  }, [props.catagory, props.id, props.type, props.array]);

  return (
    <div className="tail-wrapper">
      <div className="tail-utils">
        <h1>{props.title}</h1>
      </div>
      <div className="outer-tail">
        <div className="tails">
          {mdata.map((m, i) => (
            <div
              className="tail"
              key={i}
              onClick={() => {
                navigate(
                  `/${
                    props.catagory == undefined ? m.media_type : props.catagory
                  }/${m.id}`
                );
              }}
            >
              <img
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${m.poster_path}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tails;
