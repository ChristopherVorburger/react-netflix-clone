import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from 'test/test-utils'
import userEvent from '@testing-library/user-event'
import {LoginRegister} from 'components/LoginRegister'

test('Popup de login ou register', async () => {
  const connexion = 'Connexion'
  const register = 'Inscrivez vous'

  render(<LoginRegister open={true}></LoginRegister>)

  // Wait to remove circular progress
  await waitForElementToBeRemoved(() => screen.getByRole('alert'))

  expect(screen.getByRole('heading', {name: connexion})).toBeInTheDocument()

  // Click Event
  userEvent.click(screen.getByRole('button', {name: /Nouveau sur Netflix ?/i}))

  expect(screen.getByRole('heading', {name: register})).toBeInTheDocument()
})
