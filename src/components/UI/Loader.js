import React from 'react'
import Card from './Card'
import Spinner from './Spinner'

import classes from './Loader.module.css'

const Loader = () => {
  return(
    <div className={`d-flex align-center justify-center ${classes.loaderContainer}`}>
      <Card className={`d-flex align-center justify-center ${classes.loader}`}>
        <Spinner />
      </Card>
    </div>
  )
}

export default Loader
