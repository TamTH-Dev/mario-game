import Platform from './Platform'
import { PlatformImage } from '../assets/images'

const windowHeight = window.innerHeight

class Platforms {
  private platforms: Platform[]
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor({
    context,
    numOfPlatforms = 1,
  }: {
    context: {
      canvas: HTMLCanvasElement
      ctx: CanvasRenderingContext2D
    }
    numOfPlatforms?: number
  }) {
    this.canvas = context.canvas
    this.ctx = context.ctx
    this.platforms = [...new Array(numOfPlatforms)].map((_, index: number) => {
      const image = new Image()
      image.src = PlatformImage

      return new Platform({
        position: {
          x: index * image.width - index * 3,
          y: windowHeight - image.height,
        },
        image,
        context: {
          canvas: this.canvas,
          ctx: this.ctx,
        },
      })
    })
  }

  getPlatforms() {
    return this.platforms
  }
}

export default Platforms
