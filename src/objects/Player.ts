import { ICoordinate } from '../types'
import {
  GRAVITY,
  PLAYER_VELOCITY_X,
  PLAYER_VELOCITY_Y,
  PLAYER_MIN_X_OFFSET,
  PLAYER_MAX_X_OFFSET,
  createImage,
} from '../helpers'
import {
  SpriteRunLeftImage,
  SpriteRunRightImage,
  SpriteStandLeftImage,
  SpriteStandRightImage,
} from '../assets/images'

enum SpriteStyle {
  RunLeft = 'RUN_LEFT',
  RunRight = 'RUN_RIGHT',
  StandLeft = 'STAND_LEFT',
  StandRight = 'STAND_RIGHT',
}

const SPRITE_STYLE_MAP = {
  RUN_LEFT: {
    image: createImage(SpriteRunLeftImage),
    cropWidth: 341,
    width: 127.875,
    action: 'run',
  },
  RUN_RIGHT: {
    image: createImage(SpriteRunRightImage),
    cropWidth: 341,
    width: 127.875,
    action: 'run',
  },
  STAND_LEFT: {
    image: createImage(SpriteStandLeftImage),
    cropWidth: 177,
    width: 66,
    action: 'stand',
  },
  STAND_RIGHT: {
    image: createImage(SpriteStandRightImage),
    cropWidth: 177,
    width: 66,
    action: 'stand',
  },
}

class Player {
  private position: ICoordinate
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private velocity: ICoordinate
  private width: number
  private height: number
  private currentSprite: {
    image: CanvasImageSource
    cropWidth: number
    width: number
    action: string
  }
  private frames: number
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
    context,
    velocity,
  }: {
    position: ICoordinate
    context: {
      canvas: HTMLCanvasElement
      ctx: CanvasRenderingContext2D
    }
    velocity: ICoordinate
  }) {
    this.position = position
    this.velocity = velocity
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
    this.setSpriteStyle(SpriteStyle.StandRight)
    this.width = 66
    this.height = 150
    this.frames = 0
  }

  update() {
    this.frames++
    if (this.frames > 59 && this.currentSprite.action === 'stand') {
      this.frames = 0
    } else if (this.frames > 30 && this.currentSprite.action === 'run') {
      this.frames = 0
    }

    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.moveVertically()
    this.moveHorizontally()
  }

  draw() {
    this.ctx.drawImage(
      this.currentSprite.image,
      this.currentSprite.cropWidth * this.frames,
      0,
      this.currentSprite.cropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  moveVertically() {
    if (
      this.position.y + (this.height as number) + this.velocity.y <=
      this.canvas.height
    ) {
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

  setSpriteStyle(style: SpriteStyle) {
    this.currentSprite = SPRITE_STYLE_MAP[style]
    this.width = this.currentSprite.width
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
        this.setSpriteStyle(SpriteStyle.RunLeft)
      },
      turnRight: () => {
        this.keysState.rightKey.pressed = true
        this.setSpriteStyle(SpriteStyle.RunRight)
      },
      releaseKeyLeft: () => {
        this.keysState.leftKey.pressed = false
        this.setSpriteStyle(SpriteStyle.StandLeft)
      },
      releaseKeyRight: () => {
        this.keysState.rightKey.pressed = false
        this.setSpriteStyle(SpriteStyle.StandRight)
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
