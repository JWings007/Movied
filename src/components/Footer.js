import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate()
  return (
    <div className="footer">
      <p>&copy; 2023 MOVIED - Movie Database</p>
      <nav>
        <div className="link-1">
          <h3>Movies</h3>
          <p onClick={()=>navigate(`/movie/now_playing/list`)}>Now playing</p>
          <p onClick={()=>navigate(`/movie/top_rated/list`)}>Top rated</p>
          <p onClick={()=>navigate(`/movie/popular/list`)}>Popular</p>
          <p onClick={()=>navigate(`/movie/upcoming/list`)}>Upcoming</p>
        </div>
        <div className="link-2">
          <h3>Tv shows</h3>
          <p onClick={()=> navigate(`/tv/on_the_air/list`)}>On the air</p>
          <p onClick={()=> navigate(`/tv/airing_today/list`)}>Airing today</p>
          <p onClick={()=> navigate(`/tv/popular/list`)}>Popular</p>
          <p onClick={()=> navigate(`/tv/top_rated/list`)}>Top rated</p>
        </div>
      </nav>
    </div>
  );
}

export default Footer;
