import { Platform, Player } from './objects'
import {
  initPlayerState,
  initPlatformState,
  KEY_A,
  KEY_D,
  KEY_W,
  KEY_S,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_UP,
  KEY_DOWN,
} from './helpers'
import './styles/index.scss'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

window.addEventListener('load', init)
window.addEventListener('resize', setupViewport)

function init() {
  setupViewport()
  const player = setupPlayer()
  const platform = setupPlatform()

  run(player, platform)
}

function run(player: Player, platform: Platform) {
  requestAnimationFrame(() => run(player, platform))

  // Clear entirely frame after each update
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  player.update()
  platform.draw()

  isPlayerStandingOnPlatform(player, platform)
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

  const {
    turnLeft,
    turnRight,
    turnUp,
    turnDown,
    releaseKeyLeft,
    releaseKeyRight,
  } = player.getActions()

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    switch (event.code) {
      case KEY_A:
      case KEY_LEFT: {
        turnLeft()
        break
      }
      case KEY_D:
      case KEY_RIGHT: {
        turnRight()
        break
      }
      case KEY_W:
      case KEY_UP: {
        turnUp()
        break
      }
      case KEY_S:
      case KEY_DOWN: {
        turnDown()
        break
      }
    }
  })

  window.addEventListener('keyup', (event: KeyboardEvent) => {
    switch (event.code) {
      case KEY_A:
      case KEY_LEFT: {
        releaseKeyLeft()
        break
      }
      case KEY_D:
      case KEY_RIGHT: {
        releaseKeyRight()
        break
      }
      case KEY_W:
      case KEY_UP: {
        break
      }
      case KEY_S:
      case KEY_DOWN: {
        break
      }
    }
  })

  return player
}

function setupPlatform() {
  const platform = new Platform({
    ...initPlatformState,
    context: {
      canvas,
      ctx,
    },
  })

  return platform
}

function isPlayerStandingOnPlatform(player: Player, platform: Platform) {
  const playerPosition = player.getPosition()
  const { playerWidth, playerHeight } = player.getSize()
  const playerVelocity = player.getVelocity()
  const platformPosition = platform.getPosition()
  const { platformWidth } = platform.getSize()
  const { standOn } = player.getActions()

  if (
    playerPosition.y + playerHeight <= platformPosition.y &&
    playerPosition.y + playerHeight + playerVelocity.y >= platformPosition.y &&
    playerPosition.x + playerWidth >= platformPosition.x &&
    playerPosition.x <= platformPosition.x + platformWidth
  ) {
    standOn()
  }
}
