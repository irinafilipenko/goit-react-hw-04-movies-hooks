import s from './Searchbar.module.css'

export const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault()

    onSearch(e.target.elements.movieName.value)

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
          //  value={this.state.pictureName}
          placeholder="Search best movie"
          //   onChange={this.handleNameChange}
        />
      </form>
    </header>
  )
}
