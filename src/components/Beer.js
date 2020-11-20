import React from "react";
import { Carousel } from 'react-bootstrap';

const Movie = ({ movie }) => {
  return (
<div className="movie">
  <div className="row">
    <div className="col-sm-12">
      <div className="card">
        <div className="card-body">
          <img  src={movie.image_url}    width="10%" height="200"  aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" role="img"></img>
          <h5 className="card-title">{movie.name}</h5>
          <p className="card-text">
              {movie.description}  
          </p>
          <a href="#" className="btn btn-primary">Detail</a>
        </div>
      </div>
    </div>
  </div>

</div>
    
  );
};

export default Movie;
