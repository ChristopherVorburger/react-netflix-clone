import * as React from 'react'
import './mocks'
import {useAuth} from './context/AuthContext'
import {AppProviders} from './context'
import LoadingFullScreen from './components/LoadingFullScreen'

// On importe les composants dynamiquement avec React.lazy
// Donc c'est seulement au moment ou on aura besoin de la ressource
// qu'elle sera chargée
const UnauthApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './UnauthApp'),
)
const AuthApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './AuthApp'),
)

function App() {
  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}

const AppConsumer = () => {
  const {authUser} = useAuth()
  return (
    // On wrappe le rendu avec React.Suspense et un fallback
    <React.Suspense fallback={<LoadingFullScreen />}>
      {authUser ? <AuthApp /> : <UnauthApp />}
    </React.Suspense>
  )
}

export {App}
