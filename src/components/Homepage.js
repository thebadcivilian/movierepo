import React, { useEffect, useState } from "react";
import axios from "axios";
import MapMovieData from "./MapMovieData";
import { Link } from "react-router-dom";

function Homepage() {
  const [movieList, setMovieList] = useState([]);

  // api call to fetch data
  async function getData() {
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Planetainment
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  Contacts
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="d-flex p-2 mx-3 flex-row flex-wrap">
        {/* mapping every api movie data with an individual card   */}
        {movieList.map((movie, index) => {
          const movieImage =
            movie.show.image?.medium ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdT-CMjPc50R-jKEvJl_rcn3mBMvkcUwERg&usqp=CAU";

          // console.log(movie);

          const movieSummary = movie.show.summary
            .replace("<p>", "")
            .replace("<b>", "")
            .replace("</p>", "")
            .replace("</b>", "");

          return (
            <>
              <MapMovieData
                key={index}
                image={movieImage}
                name={movie.show.name}
                summary={movieSummary}
              ></MapMovieData>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Homepage;
