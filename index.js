import Player from './Player.js'

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

window.addEventListener('load', init)
window.addEventListener('resize', setupViewport)

function init() {
  setupViewport()
  setupPlayer()
}

function setupViewport() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function setupPlayer() {
  const player = new Player(ctx)
  player.draw()
}
