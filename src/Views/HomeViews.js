import { useState, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { fetchMovie } from '../Servies/FetchApi'

export default function HomeView() {
  const [movies, setMovies] = useState([])
  const { url } = useRouteMatch()

  // useEffect(() => {
  //   fetchMovie().then(setMovies)
  // }, [])

  useEffect(() => {
    async function onFetchMovies() {
      try {
        const movies = await fetchMovie()

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
  }, [])

  return (
    <div>
      <p>Wellcomme</p>
      <ul>
        {movies &&
          movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`${url}${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
