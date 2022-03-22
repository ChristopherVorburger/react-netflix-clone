/* eslint-disable no-unused-vars */
import * as React from 'react'
const HistoryMovieContext = React.createContext()

const MAX_ELEMENTS = 3

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADDMOVIE':
      return {
        ...state,
        movies: [action.payload, ...state.movies.slice(0, MAX_ELEMENTS - 1)],
      }
    case 'ADDSERIE':
      return {
        ...state,
        series: [action.payload, ...state.series.slice(0, MAX_ELEMENTS - 1)],
      }

    default:
      throw new Error('Action non supportée')
  }
}

const HistoryMovieProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, {series: [], movies: []})

  const {series, movies} = state

  const addMovie = movie => {
    dispatch({type: 'ADDMOVIE', payload: movie})
  }

  const addSerie = serie => {
    dispatch({type: 'ADDSERIE', payload: serie})
  }

  return (
    <HistoryMovieContext.Provider
      value={{series, movies, addMovie, addSerie}}
      {...props}
    />
  )
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
