import React from 'react';
import PropTypes from 'prop-types'
import {icons} from '../../utils/shared'
import search from '../../assets/icons/search.svg'
import calendar from '../../assets/icons/calendar.svg'
import close from '../../assets/icons/close.svg'

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const icon = props.icon
  return (
    <div className={`${props.className} ${classes.input}`}>
      {icon && icon === 'search' && <div className={`d-flex align-center justify-center mx-2 ${classes.icon}`}>
        <img src={search} alt='icon' />
      </div>}
      {icon && icon === 'calendar' && <div className={`d-flex align-center justify-center mx-2 ${classes.icon}`}>
        <img src={calendar} alt='icon' />
      </div>}
      <input ref={ref} {...props.input} />
      <div className={`d-flex align-center justify-center ml-2 ${classes.clear}`} onClick={props.onClear}>
        <img src={close} alt='' />
      </div>
    </div>
  );
});

Input.propTypes = {
  icon: PropTypes.oneOf(Object.values(icons)),
  input: PropTypes.object.isRequired
}

export default Input;
