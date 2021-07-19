import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchMovieId } from '../../Servies/FetchApi'

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState([])
  const { movieId } = useParams()

  useEffect(() => {
    async function onFetchMovies() {
      try {
        const movie = await fetchMovieId(movieId)

        // if (movies.length === 0) {
        //   throw new Error()
        // }
        // setMovies(movies)
        setMovie(movie)
        // setStatus(Status.RESOLVED)
      } catch (error) {
        // setStatus(Status.REJECTED)
        // onErrorToast()
      }
    }
    onFetchMovies(movieId)
  }, [movieId])

  return (
    <>
      {movie && (
        <>
          <h2>{movie.original_title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
            alt={movie.original_title}
          />
          <p>{movie.overview}</p>
        </>
      )}
    </>
  )
}
