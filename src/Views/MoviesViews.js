import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchBar } from '../Components/Searchbar/Searchbar'
import Button from '../Components/Button/Button'
import { fetchMoviesSearchQuery } from '../Servies/FetchApi'
import MovieList from '../Components/MovieList/MovieList'

export default function MoviesView() {
  const [movieName, setMovieName] = useState(null)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)

  const location = useLocation()

  function handleFormSubmit(movieName) {
    if (movieName.trim() === '') {
      // onErrorToast()
      alert('Error')
      return
    }
    resetState()
    setMovieName(movieName)
  }

  function resetState() {
    setMovieName(null)
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
        // setStatus(Status.RESOLVED)
      } catch (error) {
        // setStatus(Status.REJECTED)
        // onErrorToast()
      }
    }
    onFetchMovies()
  }, [movieName, page])

  // useEffect(() => {
  //   function scrollPageToEnd() {
  //     setTimeout(() => {
  //       window.scrollBy({
  //         top: document.documentElement.scrollHeight,
  //         behavior: 'smooth',
  //       })
  //     }, 1000)
  //   }

  //   if (page > 1) {
  //     scrollPageToEnd()
  //   }
  // }, [movies, page])

  function onLoadMoreBtn() {
    setPage((page) => page + 1)
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
