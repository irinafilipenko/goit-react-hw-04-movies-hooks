import axios from 'axios'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = '38444b10476064c7e49cba81a72d4aaf'

export const fetchMovie = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  )
  const results = await response.data.results

  return results
}

export const fetchMovieId = async (movie_id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`,
  )
  //   const movieDetails = await response.data
  //   const poster_path = movieDetails.poster_path
  // ? 'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path
  // : defaultImage
  //   movieDetails.poster_path = poster_path
  //     return movieDetails
  const results = await response.data

  return results
}
