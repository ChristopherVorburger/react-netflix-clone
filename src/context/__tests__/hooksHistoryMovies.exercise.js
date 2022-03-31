import {renderHook, act} from '@testing-library/react-hooks'
import {wrapperHistoryContext} from 'test/test-utils'
import {
  useClearHistory,
  useNavigateMovie,
  useAddToHistory,
} from '../HistoryMoviesContext'

import {TYPE_MOVIE} from 'config'
import {TYPE_TV} from 'config'

test('useNavigateMovie() valeurs par defauts', async () => {
  const {result} = renderHook(() => useNavigateMovie(), {
    wrapper: wrapperHistoryContext,
  })
  expect(result.current).toEqual({
    movies: [],
    series: [],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
})

test('useClearHistory() est bien une fonction', async () => {
  const {result} = renderHook(() => useClearHistory(), {
    wrapper: wrapperHistoryContext,
  })
  expect(result.current).toEqual(expect.any(Function))
})

test('useNavigateMovie() addMovie', async () => {
  const movie = {id: '550', name: 'fakeMovie'}
  const {result} = renderHook(() => useNavigateMovie(), {
    wrapper: wrapperHistoryContext,
  })
  expect(result.current).toEqual({
    movies: [],
    series: [],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
  act(() => {
    result.current.addMovie(movie)
  })
  expect(result.current).toEqual({
    movies: [movie],
    series: [],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
})

test('ajout de films via useAddToHistory()', async () => {
  const movie = {id: '550', name: 'fakeMovie'}
  const {result} = renderHook(
    () => {
      useAddToHistory(movie, TYPE_MOVIE)
      useAddToHistory(movie, TYPE_TV)
      return useNavigateMovie()
    },
    {
      wrapper: wrapperHistoryContext,
    },
  )

  expect(result.current).toEqual({
    movies: [movie],
    series: [movie],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
})
