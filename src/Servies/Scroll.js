export default function ScrollPageToEnd() {
  setTimeout(() => {
    window.scrollBy({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }, 500)
}
