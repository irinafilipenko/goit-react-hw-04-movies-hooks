import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchMovieCredits } from '../../Servies/FetchApi'
import noAvatar from '../../Images/defoultImg.jpg'
import s from './Cast.module.css'

export default function Cast() {
  const { movieId } = useParams()
  const [cast, setCast] = useState([])

  useEffect(() => {
    async function onFetchMovies(movieId) {
      try {
        const casts = await fetchMovieCredits(movieId)
        console.log(casts)

        // if (movies.length === 0) {
        //   throw new Error()
        // }
        // setMovies(movies)
        setCast(casts)
        // setStatus(Status.RESOLVED)
      } catch (error) {
        // setStatus(Status.REJECTED)
        // onErrorToast()
      }
    }
    onFetchMovies(movieId)
  }, [movieId])

  return (
    <ul className={s.list}>
      {cast.map(({ id, profile_path, name, character }) => (
        <li key={id} className={s.item}>
          <img
            className={s.photo}
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                : noAvatar
            }
            alt="actor"
          />
          <p className={s.name}>{name}</p>
          <p className={s.character}>{character || 'unknown'}</p>
        </li>
      ))}
    </ul>

    // <ul>
    //   {cast &&
    //     cast.map((movie) => (
    //       <li key={movie.id}>
    //         <img
    //           src={`https://image.tmdb.org/t/p/w500${movie.profile_path}`}
    //           alt={movie.name}
    //           width="100"
    //           height="150"
    //         />
    //         <p>{movie.name}</p>
    //       </li>
    //     ))}
    // </ul>
  )
}
