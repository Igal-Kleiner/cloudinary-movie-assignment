import React from 'react'
import PropTypes from 'prop-types'
import Card from '../UI/Card'
import unavailable from '../../assets/images/unavailable.jpg'

import classes from './MovieCard.module.css'

const MovieCard = ({movie}) => {
  const posterStyle = {
    backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster : unavailable})`
  }
  return(
    <Card className='mx-4 my-4'>
      <div className={`d-flex flex-column justify-center align-center ${classes.movieCard}`}>
        <div className={classes.moviePoster} style={posterStyle} />
        <div className='text-body-2 font-bold info-text mt-4'>
          {movie.Title} ({movie.Year})
        </div>
      </div>
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieCard
