import { FC } from "react";

interface Movie {
    Title: string;
    imdbID: string;
    Poster: string;
  }

interface MovieDetails extends Movie {
    Year: string;
    Plot: string;
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
    Response: string;
    Runtime: string;
    Title: string;
    Type: string;
    Website: string;
    Writer: string;
    imdbID: string;
    imdbRating: string;
    imdbVotes: string;
  }
  

export const Movie: FC = () => {
  return (
    <>
      
    </>
  );
};
