import { Box, LinearProgress } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function MapMovieData({ name, image, summary, isLoading }) {
  function setDataToStorage(summary, image, name) {
    localStorage.setItem("summary", summary);
    localStorage.setItem("image", image);
    localStorage.setItem("name", name);
  }

  return (
    <div className="mx-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <img
        style={{ height: "295px", width: "210px" }}
        className="rounded img-fluid"
        src={
          isLoading ? (
            <Box sx={{ width: "inherit" }}>
              <LinearProgress />
            </Box>
          ) : (
            image
          )
        }
        alt=""
      />
      <h4 className="mt-4 mb-2">{name}</h4>
      <Link
        onClick={() => {
          setDataToStorage(summary, image, name);
        }}
        to="/summary"
        className="btn btn-info"
      >
        More Details
      </Link>
    </div>
  );
}

export default MapMovieData;
