import { Platform, Platforms, Player } from './objects'
import { initPlayerState, processPlatforms, processPlayer } from './helpers'
import './styles/index.scss'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

window.addEventListener('load', init)
window.addEventListener('resize', setupViewport)

function init() {
  setupViewport()
  const player = setupPlayer()
  const platforms = setupPlatforms()

  processPlayer(player)

  runGame(player, platforms)
}

function runGame(player: Player, platforms: Platform[]) {
  requestAnimationFrame(() => runGame(player, platforms))

  // Clear entirely frame after each update
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  player.update()

  processPlatforms(platforms, player)
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
