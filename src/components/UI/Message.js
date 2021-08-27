import React from 'react'
import PropTypes from 'prop-types'
import {settings} from '../../utils/shared'

import classes from './Message.module.css'

const Message = (props) => {
  return(
    <div
      className={`d-flex align-center justify-center text-h6 font-bold ${props.type}-text ${props.className} ${classes.message}`}
    >
      {props.children}
    </div>
  )
}

Message.propTypes = {
  type: PropTypes.oneOf(Object.values(settings.messageTypes)).isRequired,
  children: PropTypes.node.isRequired
}

export default Message
