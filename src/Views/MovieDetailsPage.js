import { useParams, useLocation, useHistory } from 'react-router'
import { useState, useEffect, lazy, Suspense } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { fetchMovieId } from '../Servies/FetchApi'
import MoviesDetails from '../Components/MoviesDetails/MoviesDetails'
import { GalleryLoader } from '../Components/Loader/Loader'
import s from '../Components/Button/Button.module.css'

const Cast = lazy(() =>
  import('../Components/Cast/Cast' /* webpackChunkName: "cast" */),
)
const Reviews = lazy(() =>
  import('../Components/Reviews/Reviews' /* webpackChunkName: "reviews" */),
)

export default function MovieDetailsPage() {
  const history = useHistory()
  const location = useLocation()
  const [movie, setMovie] = useState([])
  const { movieId } = useParams()
  const { url } = useRouteMatch()

  useEffect(() => {
    async function onFetchMovies() {
      try {
        const movie = await fetchMovieId(movieId)

        // if (movies.length === 0) {
        //   throw new Error()
        // }
        // setMovies(movies)
        setMovie(movie)
        // console.log(movie.genres)
        // setStatus(Status.RESOLVED)
      } catch (error) {
        // setStatus(Status.REJECTED)
        // onErrorToast()
      }
    }

    onFetchMovies()
  }, [movieId])

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/')
  }

  return (
    <>
      <button type="button" className={s.Button} onClick={onGoBack}>
        {/* {location?.state?.from?.label ?? 'Back'} */}
        Back
      </button>

      {movie && <MoviesDetails movie={movie} url={url} location={location} />}
      {movie && (
        <Suspense
          fallback={
            <h1>
              <GalleryLoader />
            </h1>
          }
        >
          <Route path="/movies/:movieId/cast">
            <Cast />
          </Route>

          <Route path="/movies/:movieId/reviews">
            <Reviews />
          </Route>
        </Suspense>
      )}
    </>
  )
}
