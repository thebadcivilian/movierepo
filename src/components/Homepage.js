import React, { useEffect, useState } from "react";
import axios from "axios";
import MapMovieData from "./MapMovieData";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

function Homepage() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNo, setPageNo] = useState(0);

  const moviePerPage = 5;
  const pagesVisited = pageNo * moviePerPage;
  // console.log(pageNo, moviePerPage);

  const displayMovies = movieList
    .slice(pagesVisited, pagesVisited + moviePerPage)
    .map((movie, index) => {
      // console.log(index);
      const movieImage =
        movie.show.image?.medium ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdT-CMjPc50R-jKEvJl_rcn3mBMvkcUwERg&usqp=CAU";

      // console.log("movie", movie.show.name.toLowerCase());

      const movieSummary = movie.show.summary
        .replace("<p>", "")
        .replace("<b>", "")
        .replace("</p>", "")
        .replace("</b>", "");

      return (
        <>
          <MapMovieData
            key={index}
            isLoading={isLoading}
            image={movieImage}
            name={movie.show.name}
            summary={movieSummary}
          ></MapMovieData>
        </>
      );
    });

  const pageCount = Math.ceil(movieList.length / moviePerPage);

  const pageChangeHandler = ({ selected }) => {
    setPageNo(selected);
  };

  // api call to fetch data
  async function getData() {
    // setIsLoading(true);
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.message));

    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   const searchHandler = () => {};
  // });

  const searchHandler = (e) => {
    e.preventDefault();

    console.log(searchTerm);

    setMovieList(() => {
      return movieList.filter((movie) => {
        if (searchTerm === "") {
          console.log("empty search");
          return movieList;
        } else if (
          movie.show.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return movie;
        }
      });
    });
  };

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
            <form onSubmit={searchHandler} className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                value="search"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="d-flex p-2 mx-3 flex-row flex-wrap justify-content-center">
        {isLoading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <>
            {displayMovies}

            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={pageChangeHandler}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </>
        )}
        {/* mapping every api movie data with an individual card   */}
      </div>
    </>
  );
}

export default Homepage;
