import { ICoordinate } from 'src/types'

const GRAVITY = 2.5

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
    } else {
      this.velocity.y = 0
    }
  }

  moveHorizontally() {
    const { leftKey, rightKey } = this.keysState
    if (leftKey.pressed) {
      this.velocity.x -= 1
    } else if (rightKey.pressed) {
      this.velocity.x += 1
    } else {
      this.velocity.x = 0
    }
  }

  getActions() {
    return {
      turnUp: () => {
        this.velocity.y -= 40
      },
      turnDown: () => {
        this.velocity.y += 40
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
      }
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
}

export default Player
