import { FC } from "react";
import "../App.css"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

interface RouteParams {
  imdbID: string;
}

interface Movie {
  Title: string;
  imdbID: string;
  Poster: string;
}

interface MovieDetails extends Movie {
  Year: string;
  Plot: string;
}

const MovieDetailsPage: FC = () => {
  const params = useParams();
  const imdbID = params.imdbID;

  if (!imdbID) {
    return <div>Invalid movie ID</div>;
  }

  const {
    data: movieDetails,
    isLoading,
    isError,
  } = useQuery<MovieDetails>(["movieDetails", imdbID], () =>
    fetchMovieDetails(imdbID)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching movie details</div>;
  }

  return (
    <div className="flex items-center gap-[40px]">
      {movieDetails ? (
        <>
          <img src={movieDetails.Poster} alt={`${movieDetails.Title} poster`} />
          <div>
            <h2>{movieDetails.Title}</h2>
            <p>Year: {movieDetails.Year}</p>
            <p>Details: {movieDetails.Plot}</p>
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
