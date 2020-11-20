import React, { useReducer, useEffect , useState } from "react";

import Header from "./Header";
import Movie from "./Beer";
import spinner from "../assets/ajax-loader.gif";
import Search from "./Search";
import { initialState, reducer } from "../store/reducer";
import axios from "axios";
import { Carousel } from 'react-bootstrap';

import Pagination from "react-js-pagination";

// dirrre url te33 spring boot dialek
const MOVIE_API_URL = "http://localhost:8080/beers/";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const beerPerPage = 5;
  const [ activePage, setCurrentPage ] = useState(1);
  const indexOfLastTodo  = activePage * beerPerPage;
  const indexOfFirstTodo = indexOfLastTodo - beerPerPage;
  


  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      console.log(jsonResponse)
      dispatch({
        type: "SEARCH_BEERS_SUCCESS",
        payload: jsonResponse.data
      });
    });
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = searchValue => {
    dispatch({
      type: "SEARCH_BEERS_REQUEST"
    });

    axios(`http://localhost:8080/beer/${searchValue}`).then(
      jsonResponse => {
        if (jsonResponse.status === 200 ) {
          console.log(jsonResponse)

          dispatch({
            type: "SEARCH_BEERS_SUCCESS",
            payload: jsonResponse.data
          });
        } else {
          console.log(jsonResponse)

          dispatch({
            type: "SEARCH_BEERS_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  const { movies,movies_sorted, errorMessage, loading } = state;
  
  console.log(state)
  
  const handlePageChange = ( pageNumber ) => {
      console.log( `active page is ${ pageNumber }` );
      setCurrentPage( pageNumber );
      const indexOfLastTodo  = pageNumber * beerPerPage;
      const indexOfFirstTodo = indexOfLastTodo - beerPerPage;
      console.log(indexOfLastTodo);
      console.log(indexOfFirstTodo);

      dispatch({
            type: "paginate_beers",
            payload:{index_start:indexOfFirstTodo, index_stop:indexOfLastTodo} 
      }); 


  
   };

  const onItemClickHandler=(event)=>{
    console.log("test");
    console.log(event.target);
  }

  const retrievedMovies =(
      movies_sorted.map((movie, index ) => {
        return(
        <Movie key={`${index}-${movie.id}`} movie={movie} 

        onClick={onItemClickHandler}
        />
      )})
    );
  
  return (
    <div className="App">
      <div className="m-container">
        <Header text="BEERS" />

        <Search search={search} />

        <p className="App-intro">List of Beers</p>
        <div className="movies">{retrievedMovies}</div>
        
      </div>
      <div class="float-right"  >
            <Pagination
               itemClass="page-item"
               linkClass="page-link"
               activePage={ activePage }
               itemsCountPerPage={ 5 }
               totalItemsCount={ movies.length }
               pageRangeDisplayed={ 5 }
               onChange={ handlePageChange }
            />
      </div>
    </div>
  );
};

export default App;
