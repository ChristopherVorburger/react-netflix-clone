import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {getRandomType, getRandomId} from '../utils/helper'
import {clientApi} from '../utils/clientApi'
import CircularProgress from '@mui/material/CircularProgress'

import {makeStyles} from '@mui/styles'
import {useFetchData} from 'utils/hooks'

import './Netflix.css'

// Hook useStyles
const useStyles = makeStyles({
  alert: {
    width: '50%',
    margin: 'auto',
    marginBotton: '50px',
  },
  progress: {
    marginLeft: '30px',
  },
})

const NetflixApp = () => {
  const classes = useStyles()
  const [type] = React.useState(getRandomType())
  const defaultMovieId = getRandomId(type)

  const {data: headerMovie, error, status, execute} = useFetchData()

  React.useEffect(() => {
    execute(clientApi(`${type}/${defaultMovieId}`))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === 'error') {
    // sera catché par ErrorBoundary
    throw new Error(error.message)
  }

  return (
    <div>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie?.data} type={type} />
      <NetflixRow wideImage={false} title="Films Netflix" />
      <NetflixRow wideImage={true} title="Série Netflix" />

      {status === 'fetching' ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : null}

      <NetFlixFooter />
    </div>
  )
}
export {NetflixApp}
