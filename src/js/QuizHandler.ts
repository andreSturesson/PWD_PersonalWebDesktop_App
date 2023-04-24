const questions = [
  {
    question: 'What is 1+1?',
    alternatives: {
      a: '10',
      b: '2',
      c: '110'
    },
    answer: 'b'
  },
  {
    question: 'How tall is the burj khaliffa',
    alternatives: {
      a: '460',
      b: '920',
      c: '828'
    },
    answer: 'c'
  },
  {
    question: 'How many contries are there?',
    alternatives: {
      a: '195',
      b: '200',
      c: '120'
    },
    answer: 'a'
  },
  {
    question: 'How big is Växjö?',
    alternatives: {
      a: '29,29 km2',
      b: '34,41 km2',
      c: '45,19 km2'
    },
    answer: 'a'
  },
  {
    question: 'What color is an orange?',
    alternatives: {
      a: 'pink',
      b: 'orange',
      c: 'green'
    },
    answer: 'b'
  }
]

export class QuizHandler {
  private container: HTMLDivElement
  private question: HTMLHeadingElement
  private score: HTMLParagraphElement
  private questionCounter: number

  constructor () {
    this.container = document.createElement('div')
    this.question = document.createElement('h1')
    this.score = document.createElement('p')
    this.questionCounter = 0
    this.drawQuiz()
  }

  get getContainer () {
    return this.container
  }

  drawQuiz () {
    this.score.innerHTML = 'Question number: ' + (this.questionCounter + 1)
    this.question.innerHTML = questions[this.questionCounter].question
    this.container.appendChild(this.question)
    const temp = document.createElement('div')
    this.container.appendChild(temp)
    this.container.appendChild(this.score)
    for (const key in questions[this.questionCounter].alternatives) {
      const alternative = document.createElement('input')
      const alternativeLabel = document.createElement('label')
      alternativeLabel.innerHTML = questions[this.questionCounter].alternatives[key]
      alternative.type = 'radio'
      alternative.value = questions[this.questionCounter].alternatives[key]
      temp.appendChild(alternative)
      temp.appendChild(alternativeLabel)
      alternative.addEventListener('click', () => {
        this.container.removeChild(temp)
        this.getAnswer(key)
      })
    }
  }

  getAnswer (key: string) {
    if (key === questions[this.questionCounter].answer[0]) {
      this.questionCounter++
      if (this.questionCounter === questions.length) {
        this.question.innerHTML = 'You won Congratulations'
        this.score.innerHTML = 'You mananaged to correctly guess: ' + this.questionCounter + '/' + questions.length + ' questions'
        const button = document.createElement('button')
        button.innerHTML = 'Restart Game'
        this.container.appendChild(button)
        button.addEventListener('click', () => {
          this.questionCounter = 0
          this.container.removeChild(button)
          this.drawQuiz()
        })
      } else {
        this.drawQuiz()
      }
    } else {
      this.question.innerHTML = 'Wrong answer!'
      this.score.innerHTML = 'You mananaged to correctly guess: ' + this.questionCounter + '/' + questions.length + ' questions'
      const button = document.createElement('button')
      button.innerHTML = 'Restart Game'
      this.container.appendChild(button)
      button.addEventListener('click', () => {
        this.questionCounter = 0
        this.container.removeChild(button)
        this.drawQuiz()
      })
    }
  }
}
