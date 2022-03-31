import * as React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved,
  sampleMovie,
  resultsMovies,
  bookmark,
} from 'test/test-utils'
import userEvent from '@testing-library/user-event'
import {
  AUTH_URL,
  API_URL,
  localStorageTokenKey,
  imagePathOriginal,
} from 'config'
import {App} from 'App'
import * as authNetflix from '../utils/authNetflixProvider'
import {server, rest} from 'mocks'
import {TYPE_MOVIE} from 'config'

afterEach(async () => {
  await authNetflix.logout()
})

beforeEach(() => {
  const user = {id: '1', username: 'fakeUsername', token: 'FAKE_TOKEN'}
  server.use(
    rest.get(`${AUTH_URL}/me`, async (req, res, ctx) => {
      return res(ctx.json({user}))
    }),
    rest.get(`${API_URL}/movie/:id`, async (req, res, ctx) => {
      return res(ctx.json(sampleMovie))
    }),
    rest.get(`${API_URL}/tv/:id`, async (req, res, ctx) => {
      return res(ctx.json(sampleMovie))
    }),
    rest.get(`${AUTH_URL}/bookmark`, async (req, res, ctx) => {
      return res(ctx.json({bookmark}))
    }),
    rest.post(`${AUTH_URL}/bookmark/:type`, async (req, res, ctx) => {
      const {id} = req.body
      const {type} = req.params
      const newbookmark = {...bookmark}
      newbookmark[type === TYPE_MOVIE ? 'movies' : 'series']?.push(id)
      return res(ctx.json({bookmark: newbookmark}))
    }),
    rest.get(`${API_URL}/*`, async (req, res, ctx) => {
      return res(ctx.json(resultsMovies))
    }),
  )
})

test("rendu de l'app avec Token et NetFlixById", async () => {
  const route = `/movie/645886`
  window.history.pushState({}, 'Test page', route)
  window.scrollTo = jest.fn()
  const user = {id: '1', username: 'fakeUsername', token: 'FAKE_TOKEN'}
  const filmName = sampleMovie.title
  const overview = sampleMovie.overview
  const imageUrl = `${imagePathOriginal}${sampleMovie?.backdrop_path}`
  window.localStorage.setItem(localStorageTokenKey, user.token)

  render(<App></App>)

  expect(screen.getByRole('alert')).toBeInTheDocument()
  await waitForElementToBeRemoved(() => screen.getByRole('alert'))
  await waitForElementToBeRemoved(() =>
    screen.getByRole('button', {name: "Plus d'infos"}),
  )
  //screen.debug()
  expect(screen.getByRole('heading', {name: filmName})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: overview})).toBeInTheDocument()
  expect(screen.getByRole('banner', {name: 'banner'})).toHaveAttribute(
    'style',
    expect.stringContaining(imageUrl),
  )
})

test("rendu de l'app et click", async () => {
  const route = `/movie/645886`
  window.history.pushState({}, 'Test page', route)
  window.scrollTo = jest.fn()
  const user = {
    id: '1',
    username: 'fakeUsername',
    token: 'YWRtaW46bHVveGlueGlhbjkx',
  }
  const filmName = sampleMovie.title
  const overview = sampleMovie.overview
  const imageUrl = `${imagePathOriginal}${sampleMovie?.backdrop_path}`

  window.localStorage.setItem(localStorageTokenKey, user.token)
  render(<App></App>)

  await waitForElementToBeRemoved(() => screen.getByRole('alert'))
  expect(screen.getByRole('heading', {name: filmName})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: overview})).toBeInTheDocument()
  expect(screen.getByRole('banner', {name: 'banner'})).toHaveAttribute(
    'style',
    expect.stringContaining(imageUrl),
  )

  userEvent.click(screen.getByRole('button', {name: /Ajouter à ma liste/i}))
  await waitForElementToBeRemoved(() =>
    screen.getByRole('button', {name: /Ajouter à ma liste/i}),
  )
  expect(
    screen.getByRole('button', {name: /Supprimer de ma liste/i}),
  ).toBeInTheDocument()
})
