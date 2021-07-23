import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

// const Cast = () => {
//   return <div>CAST PAGE</div>;
// };

// const useGoBackToMoviesPage = () => {
//   const routerState = useRef(null);
//   const location = useLocation();
//   const history = useHistory();

//   useEffect(() => {
//     if (!routerState.current) {
//       routerState.current = location.state;
//     }
//   }, []);

//   const handleGoBack = () => {
//     const url = routerState.current ? `/?${routerState.current.params}` : '/';
//     history.push(url);
//   };

//   return {
//     goBack: handleGoBack
//   };
// };

// // /movies/:movieId
// const MovieDetailsPage = () => {
//   const { movieId } = useParams();
//   const { url, path } = useRouteMatch();
//   const { goBack } = useGoBackToMoviesPage();

//   return (
//     <div>
//       <button onClick={goBack}>Назад</button>

//       <div>Movie id: {movieId}</div>
//       <Link to={`${url}/cast`}>Cast</Link>

//       <Switch>
//         <Route path={`${path}/cast`} exact>
//           <Cast />
//         </Route>
//       </Switch>
//     </div>
//   );
// };

// // /movies -> /
// export default function App() {
//   return (
//     <>
//       {/* <Nav /> */}
//       <Link
//         to={{
//           pathname: '/movies/123',
//           state: { params: 'title=batman' }
//         }}
//       >
//         Movie 123
//       </Link>
//       <hr />

//       <Route path="/movies/:movieId">
//         <MovieDetailsPage />
//       </Route>
//     </>
//   );
// }
