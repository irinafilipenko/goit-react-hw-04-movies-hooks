import s from './Searchbar.module.css'
import PropTypes from 'prop-types'

export const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault()
    const movieName = e.target.elements.movieName.value
    onSearch(movieName)

    e.target.elements.movieName.value = ' '
  }

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSearch}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          name="movieName"
          placeholder="Search best movie"
        />
      </form>
    </header>
  )
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
