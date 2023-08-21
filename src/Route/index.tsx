import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../App";
import MovieDetailsPage from "../components/Detail";

const Routers: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:imdbID" element={<MovieDetailsPage />} />
      </Routes>
    </Router>

  );
};

export default Routers;
