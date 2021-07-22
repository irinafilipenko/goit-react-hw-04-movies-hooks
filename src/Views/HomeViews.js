import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchMovie } from '../Servies/FetchApi'
import Button from '../Components/Button/Button'
import MovieList from '../Components/MovieList/MovieList'

export default function HomeView() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)

  const location = useLocation()

  useEffect(() => {
    async function onFetchMovies() {
      try {
        const movies = await fetchMovie(page)

        if (movies.length === 0) {
          throw new Error()
        }
        // setMovies(movies)
        setMovies((state) => [...state, ...movies])
        // setStatus(Status.RESOLVED)
      } catch (error) {
        // setStatus(Status.REJECTED)
        // onErrorToast()
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
      <p>Wellcomme</p>
      {movies && <MovieList movies={movies} location={location} />}

      {showImageList && (
        <Button onClick={onLoadMoreBtn} aria-label="add contact" />
      )}
    </div>
  )
}
