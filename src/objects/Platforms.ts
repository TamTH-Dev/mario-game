import Platform from './Platform'
import { getRandomPlatform } from '../helpers'

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
    this.platforms = [...new Array(numOfPlatforms)].map(
      () =>
        new Platform({
          ...getRandomPlatform(),
          context: {
            canvas: this.canvas,
            ctx: this.ctx,
          },
        })
    )
  }

  getPlatforms() {
    return this.platforms
  }
}

export default Platforms
