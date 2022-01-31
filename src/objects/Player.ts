import { ICoordinate } from 'src/types'

class Player {
  private position: ICoordinate
  private velocity: ICoordinate
  private width: number
  private height: number
  private canvas!: HTMLCanvasElement
  private ctx!: CanvasRenderingContext2D

  constructor({
    position,
    velocity,
    width,
    height,
    context,
  }: {
    position: ICoordinate
    velocity: ICoordinate
    width: number
    height: number
    context: {
      canvas: HTMLCanvasElement
      ctx: CanvasRenderingContext2D
    }
  }) {
    this.position = position
    this.velocity = velocity
    this.width = width
    this.height = height
    this.canvas = context.canvas
    this.ctx = context.ctx
  }

  draw() {
    this.ctx.fillStyle = '#ff2200'
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.y += this.velocity.y
  }

  animate() {
    requestAnimationFrame(() => this.animate())
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.update()
  }
}

export type TPlayer = typeof Player

export default Player
