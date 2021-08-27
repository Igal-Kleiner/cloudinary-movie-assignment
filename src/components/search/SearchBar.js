import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import MoviesContext from '../../store/movies-context'
import {icons} from '../../utils/shared'
import Input from '../UI/Input'

const SearchBar = (props) => {
  const searchMovieRef = useRef()
  const searchYearRef = useRef()
  
  const handleMovieSearchInputChange = () => {
    props.onMovieInputChange(searchMovieRef.current.value)
  }
  const handleYearSearchInputChange = () => {
    props.onYearInputChange(searchYearRef.current.value)
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
                type: 'text',
                placeholder: 'Year (optional)',
                value: value.yearSearchString,
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
