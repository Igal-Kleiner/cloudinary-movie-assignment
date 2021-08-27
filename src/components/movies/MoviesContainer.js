import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import MoviesContext from '../../store/movies-context'
import MovieCard from './MovieCard'
import Button from '../UI/Button'

import classes from './MoviesContainer.module.css'

const MoviesContainer = (props) => {
  return(
      <MoviesContext.Consumer>
        {(value) => {
          return (
            <Fragment>
              <div className={`d-flex justify-center ${classes.moviesContainer}`}>
                {value.moviesList.length > 0 && value.moviesList.map(movie => {
                  return <MovieCard key={movie.id} movie={movie} />
                })}
              </div>
              {value.moviesList.length > 0 && <div className={`d-flex justify-center align-center flex-column my-2 ${classes.buttonContainer}`}>
                <Button
                  className={value.page === value.totalPages ? 'disabled' : ''}
                  action={props.onLoadMore}
                >
                  Load more
                </Button>
                <div className='justify-center text-caption'>
                  (Page {value.page} of {value.totalPages})
                </div>
              </div>}
            </Fragment>
          )
        }}
      </MoviesContext.Consumer>
  )
}

MoviesContainer.propTypes = {
  onLoadMore: PropTypes.func.isRequired
}

export default MoviesContainer
