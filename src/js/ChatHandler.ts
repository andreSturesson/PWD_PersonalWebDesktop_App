export class ChatHandler {
  private container : HTMLElement
  private properties : string[]
  private webSocket : WebSocket
  private chat: HTMLElement
  private username: string
  private isItMeWhoSent: boolean

  constructor () {
    this.isItMeWhoSent = false
    this.container = document.createElement('div')
    this.container.id = 'cont'
    this.container.classList.add('memoryContainer')
    this.checkIfUserExistsAndStartApp()
  }

  get getContainer () {
    return this.container
  }

  draw () {
    this.container.innerHTML = ''
    this.chat = document.createElement('div')
    const inputdiv : HTMLElement = document.createElement('div')
    const inputBox = document.createElement('input')
    inputBox.classList.add('chatText')
    inputBox.type = 'text'
    inputBox.tabIndex = 2
    inputBox.placeholder = 'Press enter to send'
    inputBox.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const properties = {
          type: 'message',
          data: inputBox.value,
          username: this.username,
          channel: 'channel',
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
        }
        inputBox.value = ''
        this.isItMeWhoSent = true
        this.webSocket.send(JSON.stringify(properties))
      }
    })
    inputdiv.classList.add('inputElement')
    this.chat.classList.add('chatDiv')
    inputdiv.appendChild(inputBox)
    this.container.appendChild(this.chat)
    this.container.appendChild(inputdiv)
  }

  drawUsernameScreen () {
    const userNameBox = document.createElement('input')
    userNameBox.type = 'text'
    userNameBox.placeholder = 'Create a username'
    userNameBox.addEventListener('keydown', () => {
      if (userNameBox.value != null) {
        this.username = userNameBox.value
        localStorage.setItem('user', this.username)
        this.startMainApp()
      }
    })
  }

  startMainApp () {
    this.webSocket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
    this.webSocket.onmessage = (event) => {
      this.drawMessage(event.data)
    }
    this.draw()
  }

  checkIfUserExistsAndStartApp () {
    if (localStorage.getItem('user') === null) {
      const title : HTMLElement = document.createElement('h1')
      title.innerHTML = 'Please select a username'
      const userNameBox = document.createElement('input')
      userNameBox.type = 'text'
      userNameBox.placeholder = 'Create a username'
      userNameBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          if (userNameBox.value !== null) {
            this.username = userNameBox.value
            localStorage.setItem('user', this.username)

            this.container.removeChild(userNameBox)
            this.container.removeChild(title)
            console.log('starting main app')
            this.startMainApp()
          }
        }
      })
      this.container.appendChild(title)
      this.container.appendChild(userNameBox)
    } else {
      this.username = localStorage.getItem('user') ?? ''
      console.log(this.username)
      this.startMainApp()
    }
  }

  drawMessage (data: string) {
    const main : HTMLElement = document.createElement('div')
    main.classList.add('mainChat')
    const bubble : HTMLElement = document.createElement('div')
    const userBox: HTMLElement = document.createElement('nameEncapsulate')
    const user: HTMLElement = document.createElement('p')
    userBox.classList.add('userNameBox')
    userBox.appendChild(user)
    const mes : HTMLElement = document.createElement('p')
    mes.classList.add('chatBody')
    bubble.classList.add('chatBubble')
    const message = JSON.parse(data)
    user.innerHTML = message.username
    console.log(data)
    if (message.type === 'message' || message.type === 'notification') {
      if (message.username === this.username && this.isItMeWhoSent) {
        console.log('me who sent')
        bubble.style.background = 'rgba(55, 219, 145, 0.7)'
      } else {
        bubble.style.background = 'rgba(34, 79, 225, 0.7)'
      }
      if (message.username === 'The Server') {
        bubble.style.background = 'green'
      }
      this.isItMeWhoSent = false
      mes.innerHTML = message.data
      this.chat.scrollTo(0, document.body.scrollHeight)
      main.appendChild(bubble)
      bubble.appendChild(userBox)
      bubble.appendChild(mes)
      this.chat.appendChild(main)
    }
  }
}
