import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchMovie } from '../Servies/FetchApi'

import Button from '../Components/Button/Button'
import MovieList from '../Components/MovieList/MovieList'
import { onErrorToast } from '../Components/ToastError'

export default function HomeView() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)

  const location = useLocation()

  useEffect(() => {
    async function onFetchMovies() {
      try {
        const movies = await fetchMovie(page)
        // if (movies.length === 0) {
        //   throw new Error()
        // }

        setMovies((state) => [...state, ...movies])
      } catch (error) {
        onErrorToast()
      }
    }
    onFetchMovies()
  }, [page])

  function onLoadMoreBtn() {
    setPage((page) => page + 1)
  }

  const showImageList = movies.length > 0

  return (
    <div>
      <h2>Trending today</h2>

      {movies && <MovieList movies={movies} location={location} />}

      {showImageList && (
        <Button onClick={onLoadMoreBtn} aria-label="add contact" />
      )}
    </div>
  )
}
