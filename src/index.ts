import { Platform, Platforms, Player, Scene, Scenes } from './objects'
import {
  initPlayerState,
  processPlatforms,
  processPlayerEvents,
  clearPlayerEvents,
  processScenes,
} from './helpers'
import './styles/index.scss'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

window.addEventListener('load', () => {
  init()
  runGame()
})
window.addEventListener('resize', setupViewport)

let player: Player
let platforms: Platform[]
let scenes: Scene[]

function init() {
  window.translateOffset = 0
  setupViewport()
  player = setupPlayer()
  platforms = setupPlatforms()
  scenes = setupScenes()

  processPlayerEvents(player)
  console.log('init')
}

function runGame() {
  const animationFrame = requestAnimationFrame(() => runGame())

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  processScenes(scenes, player)

  processPlatforms(platforms, player)

  player.update()

  trackGameover(player, animationFrame)
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

  return player
}

function setupPlatforms() {
  const platforms = new Platforms({
    numOfPlatforms: 3,
    context: {
      canvas,
      ctx,
    },
  })

  return platforms.getPlatforms()
}

function setupScenes() {
  const scenes = new Scenes({
    numOfScenes: 2,
    context: {
      canvas,
      ctx,
    },
  })

  return scenes.getScenes()
}

function trackGameover(player: Player, animationFrame: number) {
  if (player.getPosition().y <= canvas.height) return

  cancelAnimationFrame(animationFrame)
  clearPlayerEvents(player)
  window.removeEventListener('load', init)
  init()
}
