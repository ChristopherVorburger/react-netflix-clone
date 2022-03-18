import * as React from 'react'
// 🐶 importe le composant Skeleton de MUI
import Skeleton from '@mui/material/Skeleton'
// 📑 Le lien vers la documentation de Skeleton https://mui.com/components/skeleton/

// 🐶 Le style et le rendu du composant <NetflixHeader> et copier coller ci dessous
// 🐶 Ton boulot est de remplacer les données manquantes par des composants <Skeleton />

const styles = {
  banner: {
    backgroundColor: '#fff',

    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: 'white',
    objectFit: 'contain',
    height: '448px',
  },
}

const HeaderSkeleton = () => {
  return (
    <>
      <header style={styles.banner}>
        <div className="banner__contents">
          <h1 className="banner__title">
            <Skeleton width={300} />
          </h1>
          <div className="banner__buttons">
            <button className="banner__button banner__buttonplay">
              Lecture
            </button>
            <button className="banner__button banner__buttonInfo">
              Ajouter à ma liste
            </button>
          </div>
          <h1 className="synopsis">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </h1>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
    </>
  )
}
export {HeaderSkeleton}
