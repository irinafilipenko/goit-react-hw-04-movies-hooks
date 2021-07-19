import { Switch, Route } from 'react-router'
import './App.css'
import AppBar from './Components/AppBar/AppBar'
import HomeView from './Views/HomeViews'
import MoviesView from './Views/MoviesViews'
import NotfoundView from './Views/NotfoundView'
import MovieDetailsPage from './Views/MovieDetailsPage'

function App() {
  return (
    <div className="App">
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
        <Route path="/movies" exact>
          <MoviesView />
        </Route>
        <Route path="/:movieId">
          <MovieDetailsPage />
        </Route>
        <Route>
          <NotfoundView />
        </Route>
      </Switch>
    </div>
  )
}

export default App
