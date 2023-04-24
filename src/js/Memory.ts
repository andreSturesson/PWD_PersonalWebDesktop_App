interface Card {
  imageSrc: string;
  flipped: boolean;
  matched: boolean;
}
export class Memory {
  private container : HTMLElement
  private hasNotWon: boolean
  private counter: number
  private cards: Card[]
  private flippedCards: Card[]
  private matchedCards: Card[]
  private tabindex: number
  private cardId: number

  constructor () {
    this.cardId = 0
    this.tabindex = 0
    this.cards = []
    this.initCards()
    this.container = document.createElement('div')
    this.hasNotWon = true
    this.counter = 0
    this.container.classList.add('memoryContainer')
    this.flippedCards = []
    this.matchedCards = []
    this.shuffleCards()
    this.draw()
  }

  initCards () {
    for (let i = 0; i < 4; i++) {
      for (let i = 0; i < 4; i++) {
        this.cards.push({ imageSrc: new URL(`/img/memory/${i + 1}.png`, import.meta.url).href, flipped: false, matched: false })
      }
    }
  }

  get getContainer () {
    return this.container
  }

  flipCard (card: Card) {
    if (this.flippedCards.length < 2) {
      card.flipped = true
      this.flippedCards.push(card)
      if (this.flippedCards.length >= 2) {
        if (this.flippedCards[0].imageSrc === this.flippedCards[1].imageSrc) {
          this.flippedCards[0].matched = true
          this.flippedCards[1].matched = true
          this.flippedCards[0].flipped = false
          this.flippedCards[1].flipped = false
          this.matchedCards.push(...this.flippedCards)
          this.flippedCards = []
        } else {
          setTimeout(() => {
            this.flippedCards[0].flipped = false
            this.flippedCards[1].flipped = false
            this.flippedCards = []
            this.draw()
          }, 500)
        }
      }
    }
  }

  shuffleCards () {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }

  isGameOver () {
    return this.matchedCards.length === this.cards.length && this.matchedCards.length > 0
  }

  draw () {
    this.container.innerHTML = ''
    for (const card of this.cards) {
      const imageElement = document.createElement('button')
      this.tabindex++
      imageElement.classList.add('card-image')
      if (card.matched) {
        imageElement.style.backgroundImage = 'url(' + card.imageSrc.toString() + ')'
      } else {
        if (card.flipped) {
          imageElement.style.backgroundImage = 'url(' + card.imageSrc.toString() + ')'
        } else {
          imageElement.style.backgroundImage = 'url(' + (new URL('/img/memory/back.png', import.meta.url)).toString() + ')'
        }
      }
      imageElement.addEventListener('click', () => {
        if (!card.flipped === true) {
          new Audio(new URL('/sounds/memorySound.wav', import.meta.url).toString()).play()
          this.flipCard(card)
          this.draw()
        }
      })
      imageElement.addEventListener('keydown', (event) => {
        console.log('keydown')
        if (event.key === 'Enter') {
          if (!card.flipped === true) {
            new Audio(new URL('/sounds/memorySound.wav', import.meta.url).toString()).play()
            this.flipCard(card)
            this.draw()
          }
        }
      })
      if (!this.isGameOver()) {
        this.container.appendChild(imageElement)
        this.counter++
      }
      if (this.isGameOver() === this.hasNotWon) {
        console.log('Won the game')
        this.hasNotWon = false
        const victoryMessage = document.createElement('h1')
        victoryMessage.innerHTML = 'Victory'
        const restartButton = document.createElement('button')
        restartButton.textContent = 'Restart Game'
        restartButton.addEventListener('click', () => {
          this.flippedCards = []
          this.matchedCards = []
          this.cards = []
          this.hasNotWon = true
          this.initCards()
          this.shuffleCards()
          this.draw()
        })
        this.container.appendChild(victoryMessage)
        this.container.appendChild(restartButton)
      }
      this.cardId = 0
    }
    const sections = document.querySelectorAll('section')
    let currentIndex = 0

    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        sections[currentIndex].classList.remove('highlight')
        currentIndex = (currentIndex + 1) % sections.length
        sections[currentIndex].classList.add('highlight')
        sections[currentIndex].focus()
      } else if (event.key === 'ArrowLeft') {
        sections[currentIndex].classList.remove('highlight')
        currentIndex = (currentIndex - 1 + sections.length) % sections.length
        sections[currentIndex].classList.add('highlight')
        sections[currentIndex].focus()
      }
    })
  }
}
