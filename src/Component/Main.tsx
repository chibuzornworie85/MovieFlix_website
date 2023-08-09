import { FC } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";

interface Movie {
  Title: string;
  Plot: string;
  Poster: string;
  Year: string;
  imdbID: string;
  Response: "True" | "False";
}

const fetchMovieData = async (apiKey: string, title: string) => {
  const baseUrl = "http://www.omdbapi.com/";
  const params = {
    apikey: apiKey,
    t: title,
  };

  const response = await axios.get<Movie>(baseUrl, { params });
  const data = response.data;

  if (
    response.status === 200 &&
    (data.Response === "True" || data.Response === "False")
  ) {
    if (data.Response === "True") {
      return data;
    } else {
      throw new Error("Movie not found check your text input");
    }
  } else {
    throw new Error("Error in API response.");
  }
};

export const Main: FC = () => {
  const apiKey = "6633208c";
  const [movieTitle, setMovieTitle] = useState("");
  const queryClient = useQueryClient();

  const { data: movieData, isError } = useQuery<Movie, Error>(
    ["movie", movieTitle],
    () => fetchMovieData(apiKey, movieTitle),
    {
      enabled: false,
    }
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieTitle(event.target.value);
  };

  const handleSearch = () => {
    if (movieTitle) {
      queryClient.refetchQueries(["movie", movieTitle]);
    }
  };

  return (
    <>
      <div className="text-[20px] font-[500]">
        <div className="flex gap-[10px] justify-center">
          <input
            type="text"
            value={movieTitle}
            onChange={handleInputChange}
            className="font-[600] p-[5px] rounded-[4px]"
          />
          <button
            onClick={handleSearch}
            className=" border border-[red] text-[#fff] font-[500] p-[10px] rounded-[4px]"
          >
            Search
          </button>
        </div>
        {isError ? (
          <p className="text-[#fff]">
            Error: Movie not found check your spelling.
          </p>
        ) : (
          movieData && (
            <div className="flex flex-col justify-center text-[#fff]">
              <p>Title: {movieData.Title}</p>
              <p>Details: {movieData.Plot}</p>
              <p>Year: {movieData.Year}</p>
              <p>imdbID: {movieData.imdbID}</p>
              <img
                src={movieData.Poster}
                alt={movieData.Title}
                className="h-[300px] w-[300px]"
              />
            </div>
          )
        )}
      </div>
    </>
  );
};
