import { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import AppBar from './Components/AppBar/AppBar'
import Container from './Components/Container/Container'
import { GalleryLoader } from './Components/Loader/Loader'

const HomeView = lazy(() =>
  import('./Views/HomeViews' /* webpackChunkName: "home-view" */),
)
const MoviesView = lazy(() =>
  import('./Views/MoviesViews' /* webpackChunkName: "movie-view" */),
)
const NotfoundView = lazy(() =>
  import('./Views/NotfoundView' /* webpackChunkName: "notFound-view" */),
)
const MovieDetailsPage = lazy(() =>
  import('./Views/MovieDetailsPage' /* webpackChunkName: "detalPage-view" */),
)

function App() {
  return (
    <Container>
      <ToastContainer />
      <AppBar />
      <Suspense
        fallback={
          <h1>
            <GalleryLoader />
          </h1>
        }
      >
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>
          <Route path="/movies" exact>
            <MoviesView />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotfoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  )
}

export default App
