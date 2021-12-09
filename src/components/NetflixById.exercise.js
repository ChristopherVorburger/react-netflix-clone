import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {TYPE_MOVIE, TYPE_TV} from '../config'
import {useParams, useLocation} from 'react-router-dom'
import {useMovie} from '../utils/hooksMovies'
// 🐶 importe le Hook 'useNavigateMovie' il sera utile pour ajouter le film/serie
// affiché dans la page, dans le contexte 'HistoryMoviesContext'
import './Netflix.css'

const NetflixById = ({logout}) => {
  let {tvId, movieId} = useParams()
  const location = useLocation()
  const [type, setType] = React.useState(
    location.pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE,
  )
  const [id, setId] = React.useState(type === TYPE_TV ? tvId : movieId)
  const headerMovie = useMovie(type, id)

  // 🐶 utilise le hook 'useNavigateMovie' pour acceder à  {series, movies, setMovies, setSeries}

  // 🐶 créé une constante qui correspondra on nombre d'elements max dans l'historique (sera utilisé plus tard)
  // 🤖 `const MAX_ELEMENTS = 3`

  // 🐶 nous voulons maintenant mettre à jour la liste des films/series du context.
  // utilise 'useEffect' avec une dependance à 'headerMovie'
  // comme ça quand 'headerMovie' change, tu mettras à jour la liste des series/films
  // en utilisant `setSeries()` ou `setMovies()`
  // note : utilise un spread operator pour recopier les films / series existants
  // 📑 https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  // note 2 : limite le nombre d'éléments copié avec `slice()` et MAX_ELEMENTS
  // 📑 https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  // exemple :

  React.useEffect(() => {
    const type = location.pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE
    setType(type)
    setId(type === TYPE_TV ? tvId : movieId)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [location.pathname, movieId, tvId])

  return (
    <div>
      <NetflixAppBar logout={logout} />
      <NetflixHeader movie={headerMovie} type={type} />
      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter="trending"
        title="Films Netflix"
      />
      <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_TV}
        filter="trending"
        title="Série Netflix"
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="toprated"
        title="Les mieux notés"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="10759"
        title="Action & aventure"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="genre"
        param="53"
        title="Les meilleurs Thriller"
        watermark={false}
        wideImage={false}
      />

      <NetFlixFooter color="secondary" si />
    </div>
  )
}
export {NetflixById}