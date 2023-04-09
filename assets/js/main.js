document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('#cards .card')

  cards.forEach(card => {
    const text = card.querySelector('.text-line-clamp-2')
    const button = card.querySelector('.btn-reset')
    if (!text || !button) return

    const detectTextHeight = () => {
      text.dataset.clientHeight = text.clientHeight + 'px'
      text.dataset.scrollHeight = text.scrollHeight + 'px'

      if (text.scrollHeight > text.clientHeight) {
        button.style.display = 'block'
      } else {
        button.style.display = 'none'
      }
    }

    window.addEventListener('resize', detectTextHeight)
    detectTextHeight()

    text.style.height = text.dataset.clientHeight

    button.addEventListener('click', () => {
      if (text.classList.contains('open')) {
        text.classList.remove('open')
        text.style.display = '-webkit-box'
        text.style.height = text.dataset.clientHeight
        button.innerHTML = 'Show more...'
      } else {
        text.classList.add('open')
        text.style.display = 'block'
        text.style.height = text.dataset.scrollHeight
        button.innerHTML = 'Show less'
      }
    })
  })
})
