/* eslint-disable no-unused-vars */
import * as React from 'react'
const HistoryMovieContext = React.createContext()

const HistoryMovieProvider = props => {
  const [movies, setMovies] = React.useState([])
  const [series, setSeries] = React.useState([])
  const value = {movies, series, setMovies, setSeries}

  return <HistoryMovieContext.Provider value={value} {...props} />
}

const useNavigateMovie = () => {
  const context = React.useContext(HistoryMovieContext)
  if (!context) {
    throw new Error(
      "useNavigateMovie() s'utilise avec <HistoryMovieContext.provider>",
    )
  }
  return context
}

export {HistoryMovieContext, HistoryMovieProvider, useNavigateMovie}
