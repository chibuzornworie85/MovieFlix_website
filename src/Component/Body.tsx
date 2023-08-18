import { FC, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import { Movie, MovieDetails } from "../interfaces/movie";

const fetchMovies = async () => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: process.env.REACT_APP_APIKEY,
      s: "movie",
      page: 1,
    },
  });
  return response.data.Search;
};

const Body: FC = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<Movie[]>("movies", fetchMovies);

  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [noResults, setNoResults] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);

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

  const handleSearch = async () => {
    try {
      const response = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: process.env.REACT_APP_APIKEY,
          s: searchInput,
          page: 1,
        },
      });
      const searchResults = response.data.Search || null;
      setSearchResults(searchResults);
      setNoResults(searchResults === null || searchResults.length === 0);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults(null);
      setNoResults(true);
    }
  };

  useEffect(() => {
    if (searchInput !== "") {
      handleSearch();
    } else {
      setSearchResults(null);
      setNoResults(false);
    }
  }, [searchInput]);

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
        <div className="flex gap-[10px] md:flex-row flex-col">
          <input
            className="text-[#000] pl-[5px] rounded-[10px] py-[10px]"
            type="text"
            placeholder="Search movies..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="border border-[red] py-[10px] rounded-[10px] px-[20px]"
          >
            Search
          </button>
        </div>
        {noResults && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">No results found!</strong> Please try
            a different search.
          </div>
        )}
        <ul className="cursor-pointer items-center grid grid-cols-2 md:grid-cols-4 gap-[30px]">
          {(searchResults || movies)?.slice(0, 8).map((movie) => (
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
            <img
              src={selectedMovie.Poster}
              alt={`${selectedMovie.Title} poster`}
            />
            <div>
              <h2>{selectedMovie.Title}</h2>
              <p>Year: {selectedMovie.Year}</p>
              <p>Description: {selectedMovie.Plot}</p>
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
      apikey: process.env.REACT_APP_APIKEY,
      i: imdbID,
    },
  });
  return response.data;
};

export default Body;
