import {NetflixApp} from 'components/NetflixApp'
import {ThemeProvider} from '@mui/styles'
import {createTheme} from '@mui/material/styles'
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from './components/ErrorFallback'
import Error404 from 'components/Error404'
import {NetflixById} from 'components/NetflixById'
import {NetflixMovies} from 'components/NetflixMovies'
import {NetflixSeries} from 'components/NetflixSeries'
import {NetflixNews} from 'components/NetflixNews'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

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
    <Router>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            <Route path="/" exact={true} element={<NetflixApp />}></Route>
            <Route path="/tv/:tvId" element={<NetflixById />}></Route>
            <Route path="/movie/:movieId" element={<NetflixById />}></Route>
            <Route path="/movies" element={<NetflixMovies />}></Route>
            <Route path="/series" element={<NetflixSeries />}></Route>
            <Route path="/news" element={<NetflixNews />}></Route>
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </Router>
  )
}

export {App}
