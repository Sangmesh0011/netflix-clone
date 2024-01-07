import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      console.log(request.data.results);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          https://image.tmdb.org/t/p/w500/${movie.backdrop_path}
        )`,
        backgroundPosition: "top",
      }}
    >
      <div className="banner_contents">
        <h2>{movie.title || movie.name || movie.original_name}</h2>

        <div className="banner_buttons">
          <button>Play</button>
          <button>My list</button>
        </div>

        <h2 className="desc">{movie.overview}</h2>
      </div>
    </div>
  );
}

export default Banner;
