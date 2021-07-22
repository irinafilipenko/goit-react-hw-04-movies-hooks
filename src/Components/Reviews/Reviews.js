import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchMovieReviews } from '../../Servies/FetchApi'
import s from './Reviews.module.css'

export default function Reviews() {
  const { movieId } = useParams()
  const [review, setReviews] = useState([])

  useEffect(() => {
    async function onFetchMovies(movieId) {
      try {
        const reviews = await fetchMovieReviews(movieId)
        console.log(reviews)

        // if (movies.length === 0) {
        //   throw new Error()
        // }
        // setMovies(movies)
        setReviews(reviews)
        // setStatus(Status.RESOLVED)
      } catch (error) {
        // setStatus(Status.REJECTED)
        // onErrorToast()
      }
    }
    onFetchMovies(movieId)
  }, [movieId])

  return (
    <div>
      {review.length > 0 ? (
        <>
          <ul className={s.list}>
            {review &&
              review.map(({ id, author, content }) => (
                <li key={id} className={s.item}>
                  <p className={s.authorName}>{author}</p>
                  <p className={s.content}>{content}</p>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <p>No Reviews</p>
      )}
    </div>
  )
}
