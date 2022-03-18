import {NetflixApp} from 'components/NetflixApp'
import {ThemeProvider} from '@mui/styles'
import {createTheme} from '@mui/material/styles'

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#111',
    },
    secondary: {
      main: '#000',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NetflixApp />
    </ThemeProvider>
  )
}

export {App}
