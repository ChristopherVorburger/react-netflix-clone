import  * as React from 'react'
// 🐶 importe 'useFetchData', 'clientApi', 'Alert', 'AlertTitle' et 'CircularProgress' 'TYPE_MOVIE', 'imagePath400'

// 🐶 Ajoute les 'props' suivant à 'NetflixRow' :
// - 'type' pour identifier si on est en mode series ou films (valeur par defaut 'TYPE_MOVIE') 
// - 'param' qui contiendra des params de recherche (id de genre par exemple)
// - 'filter' qui permet de filtrer les films/series, les valeurs possibles sont :
//    - 'populaire' : valeur par defaut du props 'filter'
//    - 'latest'
//    - 'toprated'
//    - 'genre'
//    - 'trending'
// - 'watermark' un boolean qui permet d'indiquer si l'on ajoute le logo NetFlix sur les pochettes (false par défaut)
const NetflixRow = ({title ='',wideImage = true}) => {
  // 🐶 Utilise le Hook 'useFetchData' (avec {data, error, status, execute})
  
  // 🐶 créé un state 'queried' un boolean pour savoir si la requette est envoyée

  // 🐶 determine le bon 'endpoint' qui permet de faire le bon appel API
  // utilise le prop 'filter' pour determiner le bon enpoint.
  // 
  // les 5 endpoints possibles pour le moment sont
  // 
  // const endpointPopular = `${type}/popular`
  // const endpointLatest = `${type}/latest`
  // const endpointTopRated = `${type}/top_rated`
  // const endpointGenre = `discover/${type}?with_genres=${param}`
  // const endpointTrending = `trending/${type}/day`
  
  // 🐶 utilise le Hook 'useEffect' pour faire le bon appel API
  // en utilisant 'execute', 'clientAPi', 'endpoint'

  // 🐶 créé une fonction 'buildImagePath' qui prend en paramètre 'data', data sera la donnée
  // provenant de l'api, elle peut etre une film ou une serie.
  // le but de cette fonction est de retourner la bonne URL de l'image en fonction du prop 'wideImage'
  // Si 'wideImage' est à 'true' on utilisera le champs 'backdrop_path' sinon 'poster_path'
  // utilise la constante 'imagePath400' qui contient le debut de l'url pour un image.
  const image = wideImage ? 'images/sample-poster.jpg' : 'images/sample.jpg'

  // 🐶 créé une constante 'watermarkClass' qui permettra de mettre le logo sur l'image
  // watermarkClass vaut 'watermarked' si le prop 'watermark' est à true, vide sinon

  // 🐶 si 'status' vaut 'fetching' ou 'idle' retourne le composant <CircularProgress />
  // structure :
  // <div> classe 'row'
  // - <h2> avec le 'title'
  // - <div> classe 'row__posters'
  //  - <CircularProgress>

  // 🐶 si 'status' vaut 'error' retoune le composant <Alert /> contenant <AlertTitle>

  // 🐶 rendu du composant quand des données sont récuperés
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/* ⛏️ supprime ces 4 images en dur */}
        <img className="row__poster row__posterLarge" src={image} alt="" />
        <img className="row__poster row__posterLarge" src={image} alt="" />
        <img className="row__poster row__posterLarge" src={image} alt="" />
        <img className="row__poster row__posterLarge" src={image} alt="" />
        {/* 🐶 itère sur les données de l'api avec `map`
          - les données (films/series) de l'api sont dans `data.data.results`
          Pour chaque élémént afiche :
          - une <div> avec le prop 'className' : 'row__poster' 'row__posterLarge' et la variable watermarkClass
            - Dans cette  <div> une <img> avec comme source 'buildImagePath' et 'alt' le nom du film
         */}
      </div>
    </div>
  )
}
export {NetflixRow}