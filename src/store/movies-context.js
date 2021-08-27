import React from 'react'

const MoviesContext = React.createContext({
  moviesList: null,
  movieSearchString: '',
  movieSearchYear: '',
  isLoading: false,
  page: 1,
  totalPages: 0
})

export default MoviesContext

