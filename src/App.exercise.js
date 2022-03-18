/* eslint-disable no-lone-blocks */
import {NetflixApp} from 'components/NetflixApp'
import {ThemeProvider} from '@mui/styles'
import {createTheme} from '@mui/material/styles'
import {ErrorBoundary} from 'react-error-boundary'
import {NetflixAppBar} from 'components/NetflixAppBar'

// Error Fallback
const ErrorFallback = ({error, resetErrorBoundary}) => {
  return (
    <div>
      <NetflixAppBar />
      <div
        role="alert"
        style={{
          height: '100%',
          textAlign: 'center',
          margin: '100px 300px',
          color: '#fff',
        }}
      >
        <h1 style={{fontSize: '2.5em'}}>Vous cherchez votre chemin ?</h1>
        <pre style={{color: 'red', fontSize: '1em'}}>
          Erreur : {error.message}
        </pre>

        <div className="banner__buttons">
          <button
            className="banner__button banner__buttonplay"
            onClick={resetErrorBoundary}
          >
            Accueil
          </button>
        </div>
      </div>
    </div>
  )
}

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#E50914',
    },
    secondary: {
      main: '#E50914',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Wrap App with ErrorBoundary */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NetflixApp />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export {App}
