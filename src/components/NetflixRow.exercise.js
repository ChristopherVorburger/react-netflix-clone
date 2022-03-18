import * as React from 'react'
import {useFetchData} from 'utils/hooks'
import {clientApi} from 'utils/clientApi'
import {TYPE_MOVIE, imagePath400} from 'config'
import {Alert, AlertTitle} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const NetflixRow = ({
  title = '',
  wideImage = true,
  type = TYPE_MOVIE,
  param,
  filter = 'popular',
  watermark = false,
}) => {
  const {data, error, status, execute} = useFetchData()

  const endpointLatest = `${type}/latest`
  const endpointPopular = `${type}/popular`
  const endpointTopRated = `${type}/top_rated`
  const endpointGenre = `discover/${type}?with_genres=${param}`
  const endpointTrending = `trending/${type}/day`

  let endpoint
  switch (filter) {
    case 'populaire':
      endpoint = endpointPopular
      break
    case 'latest':
      endpoint = endpointLatest
      break
    case 'toprated':
      endpoint = endpointTopRated
      break
    case 'genre':
      endpoint = endpointGenre
      break
    case 'trending':
      endpoint = endpointTrending
      break
    default:
      throw new Error('Type non supporté')
  }

  // API call with match endpoint
  React.useEffect(() => {
    execute(clientApi(endpoint))
  }, [])

  const buildImagePath = data => {
    if (wideImage === true) {
      return `${imagePath400}${data.backdrop_path}`
    } else return `${imagePath400}${data.poster_path}`
  }

  const watermarkClass = watermark ? 'watermarked' : ''

  if (status === 'fetching' || status === 'idle') {
    return (
      <div className="row">
        <h2>{title} </h2>
        <div className="row__posters">
          <CircularProgress />
        </div>
      </div>
    )
  }
  if (status === 'error') {
    return (
      <Alert severity="error">
        <AlertTitle>Une erreur est survenue</AlertTitle>
      </Alert>
    )
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {data?.data.results.map(movie => {
          return (
            <div
              key={movie.id}
              className={`row__poster row__posterLarge ${watermarkClass}`}
            >
              <img src={buildImagePath(movie)} alt={movie.title} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export {NetflixRow}
