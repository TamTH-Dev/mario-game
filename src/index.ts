import { Platform, Platforms, Player } from './objects'
import { initPlayerState, processPlatforms, processPlayer } from './helpers'
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

  processPlayer(player)

  runGame(player, platforms)
}

function runGame(player: Player, platforms: Platform[]) {
  requestAnimationFrame(() => runGame(player, platforms))

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  processPlatforms(platforms, player)

  player.update()
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
