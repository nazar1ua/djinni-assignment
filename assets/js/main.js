document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('#cards .card')

  const initShowMoreButton = (card) => {
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
  }

  cards.forEach(initShowMoreButton)

  let scrollLock = false
  let page = 1

  const cardTemplate = (author, image) => (`
    <div class="card border-light-subtle">
      <img src="${image}" class="card-img-top object-fit-cover" alt="${author}">
      <div class="card-body">
        <h5 class="card-title fw-bold fs-4 mb-1">${author}</h5>
        <p class="card-text text-secondary mb-2 text-line-clamp-2">${ Math.round(Math.random()) ? 'And here full text doesn’t fit, and at the very end of it we should show an elipsis truncation.' : 'Here goes some sample, example text that is relatively short.' }</p>
        <button class="btn-reset">Show more...</button>
      </div>
      <div class="card-footer border-light-subtle bg-transparent d-flex gap-3">
        <a href="#" class="btn btn-primary">Save to collection</a>
        <a href="#" class="btn btn-outline-light text-dark">Share</a>
      </div>
    </div>
  `)

  const handleInfiniteScroll = () => {
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight

    if (endOfPage && !scrollLock) {
      scrollLock = true
      fetch(`https://picsum.photos/v2/list?page=${page}&limit=8`)
        .then(r => r.json())
        .then(r => {
          r.forEach(image => {
            const cardsContainer = document.getElementById('cards')
            // faster, than manipulation with innerHTML
            cardsContainer.insertAdjacentHTML('beforeend', cardTemplate(image.author, image.download_url))
            initShowMoreButton(cardsContainer.lastElementChild)
          })
          page++
        })
        .catch(e => {
          console.error(e)
        })
        .finally(() => {
          scrollLock = false
        })
    }
  }

  window.addEventListener('scroll', handleInfiniteScroll)
  handleInfiniteScroll()
})
