export const initialState = {
  loading: true,
  movies: [],
  movies_sorted:[],
  errorMessage: null,
  index_start:0,
  index_stop:5,
  page:0
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_BEERS_REQUEST":
      return {
        ...state,
        loading: false,
        errorMessage: null
      };
    case "SEARCH_BEERS_SUCCESS":
      return {
        ...state,
        loading: true,
        movies: action.payload,
        movies_sorted:action.payload.slice(state.index_start,state.index_stop)
      };
    case "SEARCH_BEERS_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    case "paginate_beers":
      return {
        ...state,
        loading:true ,
        index_start:action.payload.index_start,
        index_stop:action.payload.index_stop,
        movies_sorted:state.movies.slice(action.payload.index_start,action.payload.index_stop)
      }
    default:
      return state;
  }
};
