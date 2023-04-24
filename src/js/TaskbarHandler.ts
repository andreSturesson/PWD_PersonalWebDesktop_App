import { Window, WindowController } from './Window'
import { Memory } from './Memory'
import { ChatHandler } from './ChatHandler'
import { QuizHandler } from './QuizHandler'

document.getElementById('btn1')?.addEventListener('click', launchMemoryApp)
document.getElementById('btn2')?.addEventListener('click', launchChatApp)
document.getElementById('btn3')?.addEventListener('click', launchQuizApp)

const windows: WindowController = new WindowController()
let windowCounter = 0

/**
 * Opens a new memory window by initializing the memory game and the Window class.
 */
function launchMemoryApp () {
  openWindow(new Memory().getContainer, new URL('/img/memory/back.png', import.meta.url).href, 'Memory Game', '200', '250')
}

/**
 * Opens a new chat window.
 */
function launchChatApp () {
  openWindow(new ChatHandler().getContainer, new URL('/img/chatIcon.png', import.meta.url).href, 'Chat Application', '250', '500')
}

/**
 * Launches the quiz application.
 */
function launchQuizApp () {
  openWindow(new QuizHandler().getContainer, new URL('/img/sample.png', import.meta.url).href, 'Quiz Application', '400', '300')
}

/**
 * Opens a new window with desired element.
 *
 * @param {HTMLElement} element An element object containing HTML elements.
 * @param {string} logo a string containing the url for the logo.
 * @param {string} name a string containing the window name.
 * @param {string} width width.
 * @param {string} height height.
 */
function openWindow (element: HTMLElement, logo: string, name: string, width: string, height: string) {
  windowCounter++
  const temp = new Window(element, logo, name, width, height, windowCounter, windows)
  windows.pushWindow(temp)
}
