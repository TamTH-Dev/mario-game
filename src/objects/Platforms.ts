import { PlatformImage } from '../assets/images'
import { getRandomNumber } from '../helpers'

import Platform from './Platform'

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
    let cumulativeOffset = 0
    let calcOffset = 0
    this.platforms = [...new Array(numOfPlatforms)].map(() => {
      const image = new Image()
      image.src = PlatformImage

      cumulativeOffset += calcOffset
      // Reset calc offset after used
      calcOffset = 0
      // Calc offset is equal to sum of current image's width and random distance (if it exists)
      // between current image and the next one
      calcOffset += image.width

      const randomDistance = getRandomNumber(0, 200)
      // Ensure 2 platforms're not very near if there's distance between them
      if (randomDistance >= 100) {
        calcOffset += randomDistance
      }

      return new Platform({
        position: {
          x: cumulativeOffset,
          y: window.innerHeight - (image.height as number),
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
