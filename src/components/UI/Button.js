import React from 'react'
import PropTypes from 'prop-types'

import classes from './Button.module.css'

const Button = props => {
  return (
    <button
      className={`${classes.button} ${props.className}`}
      onClick={props.action}
    >
      {props.children}
    </button>
  )
}

Button.propTypes = {
  action: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Button
