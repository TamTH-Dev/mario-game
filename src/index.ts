import { Platform, Platforms, Player, Scene, Scenes } from './objects'
import {
  initPlayerState,
  processPlatforms,
  processPlayer,
  processScenes,
} from './helpers'
import './styles/index.scss'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

window.addEventListener('load', init)
window.addEventListener('resize', setupViewport)

function init() {
  setupViewport()

  window.translateOffset = 0

  const player = setupPlayer()
  const platforms = setupPlatforms()
  const scenes = setupScenes()

  processPlayer(player)

  runGame(player, platforms, scenes)
}

function runGame(player: Player, platforms: Platform[], scenes: Scene[]) {
  requestAnimationFrame(() => runGame(player, platforms, scenes))

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  processScenes(scenes, player)

  processPlatforms(platforms, player)

  player.update()

  console.log(window.translateOffset)
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
