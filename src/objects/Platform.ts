import { ICoordinate } from '../types'

class Platform {
  private position: ICoordinate
  private width: number
  private height: number
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private image: CanvasImageSource

  constructor({
    position,
    image,
    context,
  }: {
    position: ICoordinate
    image: CanvasImageSource
    context: {
      canvas: HTMLCanvasElement
      ctx: CanvasRenderingContext2D
    }
  }) {
    this.position = position
    this.image = image
    this.width = (image.width as number) || 0
    this.height = (image.height as number) || 0
    this.canvas = context.canvas
    this.ctx = context.ctx
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y)
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
