import { FC } from "react";
import { useQuery } from "react-query";
import axios from "axios";

interface Movie {
  Title: string;
  imdbID: string;
  Poster: string;
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

export const Body: FC = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<Movie[]>("movies", fetchMovies);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  return (
    <>
      <div className="text-[#fff] flex flex-col items-center gap-[10px]">
        <h1>Movie List</h1>
        <ul className="grid xl:grid-cols-5 grid-cols-2 gap-[10px]">
          {movies?.slice(0, 20).map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              {movie.Title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
