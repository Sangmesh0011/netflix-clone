import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
const base_url = "https://image.tmdb.org/t/p/w500/";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function getData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    getData();
  }, [fetchUrl]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    try {
      const response = await axios.get(
        `/movie/${movie.id}/videos?api_key=c2aedfb92686638de0115937539d0eae`
      );
      if (response.data.results.length > 0) {
        setTrailerUrl(response.data.results[0].key);
      } else {
        throw new Error("No trailer found for this movie.");
      }
    } catch (error) {
      console.error("Error fetching the trailer:", error);
      setTrailerUrl("");
    }
  };

  return (
    <div className="row">
      <div className="title_poster">
        <h2>{title}</h2>
      </div>
      <div className="row_of_movies">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="poster"
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
