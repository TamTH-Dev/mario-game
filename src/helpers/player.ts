import { Player } from '../objects'
import {
  KEY_A,
  KEY_D,
  KEY_W,
  KEY_S,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_UP,
  KEY_DOWN,
} from '../helpers'

export function processPlayerEvents(player: Player) {
  window.addEventListener('keydown', handleKeydownEvents(player))
  window.addEventListener('keyup', handleKeyupEvents(player))
}

export function clearPlayerEvents(player: Player) {
  window.removeEventListener('keydown', handleKeydownEvents(player))
  window.removeEventListener('keyup', handleKeyupEvents(player))
}

function handleKeydownEvents(player: Player) {
  const { turnLeft, turnRight, turnUp, turnDown } = player.getActions()
  return (event: KeyboardEvent) => {
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
  }
}

function handleKeyupEvents(player: Player) {
  const { releaseKeyLeft, releaseKeyRight } = player.getActions()
  return (event: KeyboardEvent) => {
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
  }
}
