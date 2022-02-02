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

export function processPlayer(player: Player) {
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
}
