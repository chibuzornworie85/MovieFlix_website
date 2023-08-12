import { FC, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
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

const Body: FC = () => {
  const { data: movies, isLoading, isError } = useQuery<Movie[]>("movies", fetchMovies);

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
      <div className="flex flex-col gap-[10px] items-center justify-center text-[#fff]">
        <h1 className="text-[red] font-[800] text-[30px]">Movie List</h1>
        <ul className="cursor-pointer items-center grid grid-cols-2 md:grid-cols-4 gap-[30px]">
          {movies?.slice(0, 8).map((movie) => (
            <Link to={`/details/${movie.imdbID}`} key={movie.imdbID}>
              <li onClick={() => handleMovieClick(movie.imdbID)}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                {movie.Title}
              </li>
            </Link>
          ))}
        </ul>
        {selectedMovie && (
          <div className="flex items-center gap-[40px]">
            <img src={selectedMovie.Poster} alt={`${selectedMovie.Title} poster`} />
            <div>
              <h2>{selectedMovie.Title}</h2>
              <p>Year: {selectedMovie.Year}</p>
              <p>Details: {selectedMovie.Plot}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
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

export default Body;
