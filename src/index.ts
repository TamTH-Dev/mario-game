import { Player } from './objects'
import { initPlayerState } from './helpers'
import './styles/index.scss'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

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
  const player = new Player({
    ...initPlayerState,
    context: {
      canvas,
      ctx,
    },
  })
  player.animate()
}
