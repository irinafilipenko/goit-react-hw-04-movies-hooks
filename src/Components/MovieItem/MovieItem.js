import { Link, useLocation, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import noPosterImg from '../../Images/defoultImg.jpg'
import s from './MovieItem.module.css'

export default function MovieItem({
  id,
  title,

  poster,
  releaseDate,
  name,
}) {
  const location = useLocation()
  const params = useParams()
  console.log(location)
  return (
    <li className={s.listItem} key={id}>
      <Link
        // to={{
        //   pathname: `/movies/${id}`,

        //   state: { from: location },
        // }}

        to={{
          pathname: `/movies/${id}`,

          state: { params: location.search },
        }}
      >
        <img
          src={
            poster ? `https://image.tmdb.org/t/p/w500/${poster}` : noPosterImg
          }
          alt={title || name}
          className={s.poster}
        />
        <h2 className={s.title}>
          {title || name}
          {releaseDate && <span> ({releaseDate.slice(0, 4)})</span>}
        </h2>
      </Link>
    </li>
  )
}

MovieItem.propTypes = {
  poster: PropTypes.string,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
}
