import { Platform, Platforms, Player, Scene, Scenes } from './objects'
import {
  processPlatforms,
  processPlayerEvents,
  clearPlayerEvents,
  processScenes,
} from './helpers'
import './styles/index.scss'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

window.addEventListener('load', init)
window.addEventListener('resize', setupViewport)

function init() {
  window.translateOffset = 0

  setupViewport()
  const player = setupPlayer()
  const platforms = setupPlatforms()
  const scenes = setupScenes()

  processPlayerEvents(player)

  runGame(player, platforms, scenes)
}

function runGame(player: Player, platforms: Platform[], scenes: Scene[]) {
  const animationFrame = requestAnimationFrame(() =>
    runGame(player, platforms, scenes)
  )

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
    width: 30,
    height: 30,
    position: {
      x: 200,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    context: {
      canvas,
      ctx,
    },
  })

  return player
}

function setupPlatforms() {
  const platforms = new Platforms({
    numOfPlatforms: 4,
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
