import { useParams, useLocation, useHistory } from 'react-router'
import { useState, useEffect, lazy, Suspense, useRef } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { fetchMovieId } from '../Servies/FetchApi'
import MoviesDetails from '../Components/MoviesDetails/MoviesDetails'
import { GalleryLoader } from '../Components/Loader/Loader'
import { onErrorToast } from '../Components/ToastError'
import s from '../Components/Button/Button.module.css'

const Cast = lazy(() =>
  import('../Components/Cast/Cast' /* webpackChunkName: "cast" */),
)
const Reviews = lazy(() =>
  import('../Components/Reviews/Reviews' /* webpackChunkName: "reviews" */),
)

const useGoBackToMoviesPage = () => {
  const routerState = useRef(null)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (!routerState.current) {
      routerState.current = location.state
    }
  }, [location.state])

  const handleGoBack = () => {
    const url = routerState.current ? `/${routerState.current.params}` : '/'
    history.push(url)
    console.log(url)
  }

  return {
    goBack: handleGoBack,
  }
}

export default function MovieDetailsPage() {
  // const location = useLocation()
  const { url, path } = useRouteMatch()
  const { goBack } = useGoBackToMoviesPage()

  const [movie, setMovie] = useState([])
  const { movieId } = useParams()

  useEffect(() => {
    async function onFetchMovies() {
      try {
        const movie = await fetchMovieId(movieId)

        if (movie.length === 0) {
          throw new Error()
        }

        setMovie(movie)
      } catch (error) {
        onErrorToast()
      }
    }

    onFetchMovies()
  }, [movieId])

  // const goBack = () => {
  //   history.push(location?.state?.from ?? '/')
  // }

  return (
    <>
      {movie && (
        <button type="button" className={s.Button} onClick={goBack}>
          Back
        </button>
      )}

      {movie && <MoviesDetails movie={movie} url={url} />}
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
