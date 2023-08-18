export interface Movie {
  Title: string;
  imdbID: string;
  Poster: string;
}

export interface MovieDetails {
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
  Type: string;
  Website: string;
  Writer: string;
  imdbRating: string;
  imdbVotes: string;
  Title: string;
  imdbID: string;
  Poster: string;
}

export interface Movie {
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
  Runtime: string;
  Type: string;
  Website: string;
  Writer: string;
  imdbRating: string;
  imdbVotes: string;
    Response: "True" | "False";
}
