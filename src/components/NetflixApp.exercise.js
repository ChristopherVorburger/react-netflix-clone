import React, {useEffect} from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import './Netflix.css'
import {getRandomType, getRandomId} from '../utils/helper'
import {imagePathOriginal, TYPE_MOVIE} from '../config'
import {clientApi} from 'utils/clientApi'

const NetflixHeader = ({movie, type = TYPE_MOVIE}) => {
  // Title
  const title = type === TYPE_MOVIE ? movie?.title : movie?.name

  // Url
  const imageUrl = `${imagePathOriginal}${movie?.backdrop_path}`

  // Create style banner
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: 'white',
    objectFit: 'contain',
    height: '448px',
  }

  // If no movie return empty fragment
  if (!movie) {
    return <></>
  }

  return (
    <header style={banner}>
      <div className="banner__contents">
        <h1 className="banner__title">{title ?? '...'}</h1>
        <div className="banner__buttons">
          <button className="banner__button banner__buttonplay">Lecture</button>
          <button className="banner__button banner__buttonInfo">
            Ajouter à ma liste
          </button>
        </div>
        <h1 className="synopsis">{movie?.overview ?? '...'}</h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  )
}

const NetflixApp = () => {
  const [headerMovie, setHeaderMovie] = React.useState()
  // Get random type
  const [type] = React.useState(getRandomType())

  // Get random serie or movie

  // Set id
  const defaultMovieId = getRandomId(type)

  // Fetch data with axios
  useEffect(() => {
    // Use clientApi to get data
    clientApi(`${type}/${defaultMovieId}`)
      .then(response => {
        setHeaderMovie(response.data)
        console.log(response.data)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie} type={type} />
      <NetflixRow wideImage={false} title="Films Netflix" />
      <NetflixRow wideImage={true} title="Série Netflix" />
      <NetFlixFooter />
    </div>
  )
}
export {NetflixApp}
