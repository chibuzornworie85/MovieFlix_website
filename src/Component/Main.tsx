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
  Actors: string;
  Awards: string;
  Country: string;
  DVD: string;
  BoxOffice: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Production: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Type: string;
  Website: string;
  Writer: string;
  imdbRating: string;
  imdbVotes: string;
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
      throw new Error("Movie not found check your connection and text input");
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
      <div className="text-[20px] font-[500] flex flex-col gap-[20px]">
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
            <div className="flex flex-col justify-center items-center text-[#fff] gap-[20px]">
              <img src={movieData.Poster} alt={movieData.Title} />
              <div>
                <p>Title: {movieData.Title}</p>
                <p>Details: {movieData.Plot}</p>
                <p>Year: {movieData.Year}</p>
                <p>imdbID: {movieData.imdbID}</p>
                <p>Actors: {movieData.Actors}</p>
                <p>Awards: {movieData.Awards}</p>
                <p>BoxOffice: {movieData.BoxOffice}</p>
                <p>Country: {movieData.Country}</p>
                <p>DVD: {movieData.DVD}</p>
                <p>Director: {movieData.Director}</p>
                <p>Genre: {movieData.Genre}</p>
                <p>Language: {movieData.Language}</p>
                <p>Metascore: {movieData.Metascore}</p>
                <p>Production: {movieData.Production}</p>
                <p>Rated: {movieData.Rated}</p>
                <p>Released: {movieData.Released}</p>
                <p>Runtime: {movieData.Runtime}</p>
                <p>Type: {movieData.Type}</p>
                <p>Website: {movieData.Website}</p>
                <p>Writer: {movieData.Writer}</p>
                <p>imdbRating: {movieData.imdbRating}</p>
                <p>imdbVotes: {movieData.imdbVotes}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};
