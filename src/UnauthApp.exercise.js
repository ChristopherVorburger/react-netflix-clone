import * as React from 'react'
import LoginRegister from './components/LoginRegister'

function UnauthApp({login, register, error}) {
  const imageUrl = '/images/posters.jpg'
  const style = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',

    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'auto',
  }
  return (
    <div style={style}>
      <img
        src="/images/netflix-logo.png"
        alt="logo"
        style={{margin: '30px'}}
        height={50}
      />

      <div>
        <LoginRegister
          open={true}
          login={login}
          register={register}
          error={error}
        />
      </div>
    </div>
  )
}

export {UnauthApp}
