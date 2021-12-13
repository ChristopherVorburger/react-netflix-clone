// 🐶 Toutes les dependances necessaires

// import * as React from 'react'
// import {render as renderReactTestingLib} from '@testing-library/react'
// import {AuthProvider} from '../context/AuthContext'
// import {createTheme, ThemeProvider} from '@mui/material/styles'
// import {QueryClient, QueryClientProvider} from 'react-query'
// import {HistoryMovieProvider} from '../context/HistoryMoviesContext'

// 🐶 créé une instance de 'queryClient' et 'theme'
// 🤖
// const queryClient = new QueryClient()
// const theme = createTheme()

// 🐶 créé une fonction 'render' qui contiendra le wrapper qui contiendra tous les providers de src/context.index.js
function render(ui, {...options} = {}) {
  const wrapper = ({children}) => {
    // retourne l'arbre de ces composants avec les bons props
    // QueryClientProvider
    // ThemeProvider
    // HistoryMovieProvider
    // AuthProvider
    return <></>
  }
  return null //renderReactTestingLib(ui, {wrapper, ...options})
}

export * from '@testing-library/react'
// surcharge de render
export {render}