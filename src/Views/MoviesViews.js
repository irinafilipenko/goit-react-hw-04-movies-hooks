import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { SearchBar } from '../Components/Searchbar/Searchbar'
import Button from '../Components/Button/Button'
import { fetchMoviesSearchQuery } from '../Servies/FetchApi'
import MovieList from '../Components/MovieList/MovieList'
import { onErrorToast } from '../Components/ToastError'
import ScrollPageToEnd from '../Servies/Scroll'

export default function MoviesView() {
  // const [movieName, setMovieName] = useState(null)
  const [movies, setMovies] = useState([])
  // const [page, setPage] = useState(currentPage)

  const location = useLocation()
  const history = useHistory()
  // const currentPage = new URLSearchParams(location.search).get('page') ?? 1
  const movieName = new URLSearchParams(location.search).get('query') ?? ''
  const [page, setPage] = useState(1)
  // console.log(currentPage)

  function handleFormSubmit(movieName) {
    history.push({
      ...location,
      search: `query=${movieName}`,
    })
    // setMovies([])
    if (movieName.trim() === '') {
      onErrorToast()

      return
    }
    resetState()
    // setMovieName(movieName)
  }

  function resetState() {
    // setMovieName(null)
    setPage(1)
    setMovies([])
  }

  useEffect(() => {
    if (!movieName) {
      return
    }
    async function onFetchMovies() {
      try {
        const movies = await fetchMoviesSearchQuery(movieName, page)

        if (movies.length === 0) {
          throw new Error()
        }

        setMovies((state) => [...state, ...movies])
      } catch (error) {
        onErrorToast()
      }
    }

    onFetchMovies()
  }, [movieName, page])

  useEffect(() => {
    if (page > 1) {
      ScrollPageToEnd()
    }
  }, [movies, page])

  function onLoadMoreBtn(page) {
    setPage((page) => page + 1)

    console.log(page)
    history.push({ ...location, search: `query=${movieName}` })
  }

  const showImageList = movies.length > 0

  return (
    <div>
      <SearchBar onSearch={handleFormSubmit} />
      <MovieList movies={movies} location={location} />

      {showImageList && (
        <Button onClick={onLoadMoreBtn} aria-label="add contact" />
      )}
    </div>
  )
}
