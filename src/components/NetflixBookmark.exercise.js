import * as React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixHeader} from './NetflixHeader'
import {useFetchData} from '../utils/hooks'
import {clientNetFlix, clientApi} from '../utils/clientApi'
import * as authNetflix from '../utils/authNetflixProvider'
import {Link} from 'react-router-dom'
import {TYPE_MOVIE, TYPE_TV, imagePath400} from '../config'

const NetflixBookmark = ({logout}) => {
  const {data, execute} = useFetchData()
  const {data: headerMovie, execute: executeHeader} = useFetchData()

  React.useEffect(() => {
    async function getTokenExecute() {
      const token = await authNetflix.getToken()
      execute(clientNetFlix(`bookmark`, {token}))
    }
    getTokenExecute()
  }, [execute])

  React.useEffect(() => {
    const id = data?.bookmark?.movies?.[0] ?? 749274
    executeHeader(clientApi(`${TYPE_MOVIE}/${id}`))
  }, [data, executeHeader])

  return (
    <>
      <NetflixAppBar logout={logout} />
      <NetflixHeader movie={headerMovie?.data} type={TYPE_MOVIE} />
      <div className="row">
        <h2>Films favoris</h2>
        <div className="row__posters">
          {data?.bookmark.movies.map(id => {
            return (
              <Card
                key={id}
                id={id}
                type={TYPE_MOVIE}
                watermark={true}
                wideImage={true}
              />
            )
          })}
        </div>
      </div>

      <div className="row">
        <h2>Séries favorites</h2>
        <div className="row__posters">
          {data?.bookmark.series.map(id => {
            return <Card key={id} id={id} type={TYPE_TV} />
          })}
        </div>
      </div>
    </>
  )
}

const Card = ({id, type, watermark, wideImage}) => {
  const {data, execute} = useFetchData()
  const [image, setImage] = React.useState('')

  React.useEffect(() => {
    execute(clientApi(`${type}/${id}`))
  }, [execute, id, type])

  // Cannot using buildingImagePAth directly cuz of the component sis already mounted
  // So we have to use an useEffect to build the image path
  React.useEffect(() => {
    const buildImagePath = data => {
      const image = wideImage ? data?.backdrop_path : data?.poster_path
      return image ? `${imagePath400}${image}` : null
    }
    setImage(buildImagePath(data?.data))
  }, [data, wideImage])

  const watermarkClass = watermark ? 'watermarked' : ''
  return (
    <Link key={id} to={`/${type}/${id}`}>
      <div className={`row__poster row__posterLarge ${watermarkClass}`}>
        <img src={image} alt={data?.name} />
      </div>
    </Link>
  )
}
export {NetflixBookmark}
