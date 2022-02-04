import { ICoordinate } from '../types'
import { SCENE_TRANSLATE_FACTOR } from '../helpers'

class Scene {
  private position: ICoordinate
  private width: number
  private height: number
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private image: CanvasImageSource
  private isFullHeight?: boolean

  constructor({
    position,
    image,
    isFullHeight = false,
    context,
  }: {
    position: ICoordinate
    image: CanvasImageSource
    isFullHeight?: boolean
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
    this.isFullHeight = isFullHeight
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.isFullHeight ? window.innerHeight : this.height
    )
  }

  translateToLeftSide() {
    this.position.x -= SCENE_TRANSLATE_FACTOR
  }

  translateToRightSide() {
    this.position.x += SCENE_TRANSLATE_FACTOR
  }
}

export default Scene
