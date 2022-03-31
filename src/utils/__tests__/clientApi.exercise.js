import {clientAuth, clientNetFlix} from 'utils/clientApi'

import {server, rest} from 'mocks'
import {AUTH_URL} from '../../config'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('faire une requete HTTP GET vers un endpoint', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = {mockResult: 'TEST'}
  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(resultRequest))
    }),
  )
  const results = await clientAuth(endpoint)
  expect(results.data).toEqual(resultRequest)
})

test('Verifier les data passées en parameters', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = {mockResult: 'TEST'}
  const data = {fake: 'fakedata'}

  let request
  server.use(
    rest.post(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req.body
      return res(ctx.json(resultRequest))
    }),
  )
  await clientAuth(endpoint, {data})
  expect(data).toEqual(request)
})

test('Verifier le token  passé en parameters', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = {mockResult: 'TEST'}
  const token = 'faketoken'

  let request
  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    }),
  )
  await clientAuth(endpoint, {token})
  expect(request.headers.get('Authorization')).toContain(`Bearer ${token}`)
})

test('Verifier le couple token/data passé en parameters', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = {mockResult: 'TEST'}
  const data = {fake: 'fakedata'}
  const token = 'faketoken'

  let request
  server.use(
    rest.post(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    }),
  )
  await clientAuth(endpoint, {token, data})
  expect(data).toEqual(request.body)
  expect(request.headers.get('Authorization')).toContain(`Bearer ${token}`)
})
