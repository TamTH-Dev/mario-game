import { ICoordinate } from '../types'
import {
  GRAVITY,
  PLAYER_VELOCITY_X,
  PLAYER_VELOCITY_Y,
  PLAYER_MIN_X_OFFSET,
  PLAYER_MAX_X_OFFSET,
} from '../helpers'

class Player {
  private position: ICoordinate
  private width: number
  private height: number
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private velocity: ICoordinate
  private keysState: {
    leftKey: {
      pressed: boolean
    }
    rightKey: {
      pressed: boolean
    }
    upKey: {
      pressedCount: number
    }
  }

  constructor({
    position,
    width,
    height,
    context,
    velocity,
  }: {
    position: ICoordinate
    width: number
    height: number
    context: {
      canvas: HTMLCanvasElement
      ctx: CanvasRenderingContext2D
    }
    velocity: ICoordinate
  }) {
    this.position = position
    this.velocity = velocity
    this.width = width
    this.height = height
    this.canvas = context.canvas
    this.ctx = context.ctx
    this.keysState = {
      leftKey: {
        pressed: false,
      },
      rightKey: {
        pressed: false,
      },
      upKey: {
        pressedCount: 0,
      },
    }
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.moveVertically()
    this.moveHorizontally()
  }

  draw() {
    this.ctx.fillStyle = '#ff2200'
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  moveVertically() {
    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += GRAVITY
    }
  }

  moveHorizontally() {
    const { leftKey, rightKey } = this.keysState
    if (leftKey.pressed && this.position.x > PLAYER_MIN_X_OFFSET) {
      this.velocity.x -= PLAYER_VELOCITY_X
    } else if (rightKey.pressed && this.position.x < PLAYER_MAX_X_OFFSET) {
      this.velocity.x += PLAYER_VELOCITY_X
    } else {
      this.velocity.x = 0
    }
  }

  getActions() {
    return {
      turnUp: () => {
        // Prevent pressing up key continuously
        if (this.keysState.upKey.pressedCount >= 2) return

        this.velocity.y -= PLAYER_VELOCITY_Y
        this.keysState.upKey.pressedCount += 1
      },
      turnDown: () => {
        this.velocity.y += PLAYER_VELOCITY_Y
      },
      turnLeft: () => {
        this.keysState.leftKey.pressed = true
      },
      turnRight: () => {
        this.keysState.rightKey.pressed = true
      },
      releaseKeyLeft: () => {
        this.keysState.leftKey.pressed = false
      },
      releaseKeyRight: () => {
        this.keysState.rightKey.pressed = false
      },
      standOn: () => {
        this.velocity.y = 0
        this.keysState.upKey.pressedCount = 0
      },
    }
  }

  getPosition() {
    return this.position
  }

  getVelocity() {
    return this.velocity
  }

  getSize() {
    return {
      playerWidth: this.width,
      playerHeight: this.height,
    }
  }

  getKeysState() {
    return this.keysState
  }
}

export default Player
