import * as React from 'react'
import './mocks'
import {AuthApp} from 'AuthApp'
import {UnauthApp} from 'UnauthApp.exercise'
import {AppProviders} from 'context'
import {useAuth} from 'context/AuthContext.exercise'

function App() {
  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}

const AppConsumer = () => {
  const {authUser} = useAuth()
  return authUser ? <AuthApp /> : <UnauthApp />
}

export {App}
