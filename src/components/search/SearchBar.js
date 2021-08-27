import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import MoviesContext from '../../store/movies-context'
import {icons} from '../../utils/shared'
import Input from '../UI/Input'

const SearchBar = (props) => {
  const searchMovieRef = useRef()
  const searchYearRef = useRef()
  
  // first movie ever made was released in 1888, no point of searching info prior to that
  const firstMovie = 1888
  const currentYear = new Date().getFullYear()
  
  const handleMovieSearchInputChange = () => {
    props.onMovieInputChange(searchMovieRef.current.value.trim())
  }
  const handleYearSearchInputChange = () => {
    props.onYearInputChange(searchYearRef.current.value.trim())
  }
  
  return (
    <MoviesContext.Consumer>
      {(value) => {
        return (
          <div className='d-flex flex-nowrap my-4'>
            <Input
              ref={searchMovieRef}
              icon={icons.search}
              className='mr-4'
              input={{
                id: 'movieInput',
                type: 'text',
                placeholder: 'Search movie title',
                value: value.movieSearchString,
                onChange: handleMovieSearchInputChange
              }}
              onClear={props.onClearMovie}
            />
            <Input
              ref={searchYearRef}
              icon={icons.calendar}
              className='shrink-3'
              input={{
                id: 'yearInput',
                type: 'number',
                placeholder: 'Year (optional)',
                value: value.yearSearchString,
                min: firstMovie,
                max: currentYear,
                onChange: handleYearSearchInputChange
              }}
              onClear={props.onClearYear}
            />
          </div>
        )
      }}
    </MoviesContext.Consumer>
  )
}

SearchBar.propTypes = {
  onMovieInputChange: PropTypes.func.isRequired,
  onYearInputChange: PropTypes.func.isRequired,
  onClearMovie: PropTypes.func.isRequired,
  onClearYear: PropTypes.func.isRequired
}

export default SearchBar
