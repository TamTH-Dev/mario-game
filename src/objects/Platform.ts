import { ICoordinate } from 'src/types'

class Platform {
  private position: ICoordinate
  private width: number
  private height: number
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor({
    position,
    width,
    height,
    context,
  }: {
    position: ICoordinate
    width: number
    height: number
    context: {
      canvas: HTMLCanvasElement
      ctx: CanvasRenderingContext2D
    }
  }) {
    this.position = position
    this.width = width
    this.height = height
    this.canvas = context.canvas
    this.ctx = context.ctx
  }

  draw() {
    this.ctx.fillStyle = '#ff00ff'
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  translateToLeftSide() {
    this.position.x -= 5
  }

  translateToRightSide() {
    this.position.x += 5
  }

  getPosition() {
    return this.position
  }

  getSize() {
    return {
      platformWidth: this.width,
      platformHeight: this.height,
    }
  }
}

export default Platform
