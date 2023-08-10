import { FC } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

interface Movie {
  Title: string;
  imdbID: string;
  Poster: string;
}

interface MovieDetails extends Movie {
  Year: string;
  Plot: string;
}
//   apikey: "6633208c",
const fetchMovies = async () => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "6633208c",
      s: "movie",
      page: 1,
    },
  });
  return response.data.Search;
};

const fetchMovieDetails = async (imdbID: string) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "6633208c",
      i: imdbID,
    },
  });
  return response.data;
};

export const Body: FC = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<Movie[]>("movies", fetchMovies);

  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  const handleMovieClick = async (imdbID: string) => {
    console.log("Clicked on movie:", imdbID);
    try {
      const movieDetails = await fetchMovieDetails(imdbID);
      console.log("Fetched movie details:", movieDetails);
      setSelectedMovie(movieDetails);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-[10px] text-[#fff]">
        <h1 className="text-[red] font-[800] flex justify-center text-[30px]">Movie List</h1>
        {selectedMovie && (
          <div>
            <h2>{selectedMovie.Title}</h2>
            <p>Year: {selectedMovie.Year}</p>
            <p>Details: {selectedMovie.Plot}</p>
          </div>
        )}
        <ul className="md:flex cursor-pointer grid grid-cols-2 gap-[30px]">
          {movies?.slice(0, 4).map((movie) => (
            <li
              key={movie.imdbID}
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              {movie.Title}
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
