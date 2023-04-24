export class WindowController {
  //  eslint-disable-next-line no-use-before-define
  private windows : Window[]

  constructor () {
    this.windows = []
  }

  bringToFront () {
    this.windows.forEach(element => {
      element.getItemContainer().style.zIndex = '1'
    })
  }

  pushWindow (window: Window) {
    this.windows.push(window)
  }
}
export class Window {
  private itemElement: HTMLDivElement
  private drop: HTMLElement
  private droppableArea: HTMLElement
  private z: number
  private initialLeft: number
  private initialTop: number
  private initialMouseX: number
  private initialMouseY: number
  private id: number
  private zIndexController: WindowController

  constructor (element: HTMLElement, logo :string, name: string, width: string, height: string, which: number, controller: WindowController) {
    this.id = which
    this.zIndexController = controller
    this.z = 10
    this.droppableArea = document.querySelector('main') ?? document.createElement('main')
    this.drop = document.getElementById('drop') ?? document.createElement('div')
    this.itemElement = document.createElement('div')
    this.itemElement.classList.add('item')
    this.itemElement.id = 'item'
    this.itemElement.style.top = '15px'
    this.itemElement.style.width = width + 'px'
    this.itemElement.style.height = height + 'px'
    const windowEditElement = document.createElement('div')
    windowEditElement.classList.add('windowEdit')
    windowEditElement.setAttribute('draggable', 'true')
    const logoElement = document.createElement('img')
    logoElement.src = logo
    logoElement.classList.add('logo')
    const windowTitle = document.createElement('p')
    windowTitle.classList.add('windowTitleText')
    windowTitle.innerHTML = name
    const exitWindowButton = document.createElement('button')
    exitWindowButton.classList.add('exitWindow')
    exitWindowButton.textContent = '❌'

    windowEditElement.appendChild(exitWindowButton)
    windowEditElement.appendChild(logoElement)
    windowEditElement.appendChild(windowTitle)
    this.itemElement.appendChild(windowEditElement)
    this.itemElement.appendChild(element)
    this.drop.appendChild(this.itemElement)

    windowEditElement.addEventListener('dragstart', this.dragStartHandler.bind(this))
    this.itemElement.addEventListener('mousedown', this.mousedown.bind(this))
    windowEditElement.addEventListener('drag', this.dragHandler.bind(this))
    exitWindowButton.addEventListener('click', this.exit.bind(this))
    this.droppableArea.addEventListener('dragover', (event) => {
      console.log(event)
      event.preventDefault()
    })
  }

  getItemContainer () {
    return this.itemElement
  }

  dragStartHandler (event) {
    this.initialLeft = this.itemElement.offsetLeft
    this.initialTop = this.itemElement.offsetTop
    this.initialMouseX = event.clientX
    this.initialMouseY = event.clientY
    event.dataTransfer.dropEffect = 'move'
  }

  mousedown () {
    this.zIndexController.bringToFront()
    this.itemElement.style.zIndex = '10'
  }

  dragHandler (event) {
    this.itemElement.style.left = this.initialLeft + event.clientX - this.initialMouseX + 'px'
    this.itemElement.style.top = this.initialTop + event.clientY - this.initialMouseY + 'px'
  }

  exit () {
    this.drop?.removeChild(this.itemElement)
  }
}
