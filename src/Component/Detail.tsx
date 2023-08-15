import { FC } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { MovieDetails } from "./Interfaces/Interface";

// interface RouteParams {
//   imdbID: string;
// }

const MovieDetailsPage: FC = () => {
  const params = useParams();
  const imdbID = params.imdbID ?? ""; 

  const {
    data: movieDetails,
    isLoading,
    isError,
  } = useQuery<MovieDetails>(["movieDetails", imdbID], () =>
    fetchMovieDetails(imdbID)
  );

  if (!imdbID) {
    return <div>Invalid movie ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching movie details</div>;
  }

  return (
    <div
      style={{ fontFamily: "Poppins" }}
      className="flex flex-col md:flex-row bg-[#000] py-[20px] text-[20px] md:h-[100vh] text-[#fff] px-[20px] items-center gap-[30px]"
    >
      {movieDetails ? (
        <>
          <img src={movieDetails.Poster} alt={`${movieDetails.Title} poster`} />
          <div className="flex flex-col md:flex-row gap-[30px]">
            <div>
              <h2>{movieDetails.Title}</h2>
              <p>Year: {movieDetails.Year}</p>
              <p>Description: {movieDetails.Plot}</p>
              <p>Year: {movieDetails.Actors}</p>
              <p>Awards: {movieDetails.Awards}</p>
              <p>Country: {movieDetails.Country}</p>
              <p>DVD: {movieDetails.DVD}</p>
              <p>BoxOffice: {movieDetails.BoxOffice}</p>
              <p>Director: {movieDetails.Director}</p>
              <p>Genre: {movieDetails.Genre}</p>
              <p>Language: {movieDetails.Language}</p>
            </div>
            <div>
              <p>Metascore: {movieDetails.Metascore}</p>
              <p>Production: {movieDetails.Production}</p>
              <p>Rated: {movieDetails.Rated}</p>
              <p>Released: {movieDetails.Released}</p>
              <p>Response: {movieDetails.Response}</p>
              <p>Runtime: {movieDetails.Runtime}</p>
              <p>Type: {movieDetails.Type}</p>
              <p>Website: {movieDetails.Website}</p>
              <p>Writer: {movieDetails.Writer}</p>
              <p>imdbID: {movieDetails.imdbID}</p>
              <p>imdbRating: {movieDetails.imdbRating}</p>
              <p>imdbVotes: {movieDetails.imdbVotes}</p>
            </div>
          </div>
        </>
      ) : (
        <div>No movie details available</div>
      )}
    </div>
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

export default MovieDetailsPage;
