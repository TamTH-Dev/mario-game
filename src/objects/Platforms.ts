import { ICoordinate } from '../types'
import { PlatformImage, PlatformSmallTallImage } from '../assets/images'
import { createImage, getRandomNumber } from '../helpers'

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
    const platformImage = createImage(PlatformImage)
    const platformSmallTallImage = createImage(PlatformSmallTallImage)
    const platformWidth = platformImage.width
    const platformHeight = platformImage.height
    const platformSmallTallWidth = platformSmallTallImage.width
    const platformSmallTallHeight = platformSmallTallImage.height
    let cumulativeOffset = 0
    let calcOffset = 0
    let platformSmallTallAppeared = false
    this.platforms = [...new Array(numOfPlatforms)].map(() => {
      const randomNumber = getRandomNumber(0, 1)
      let position: ICoordinate
      let image: CanvasImageSource

      if (randomNumber >= 0.6 || platformSmallTallAppeared) {
        image = platformImage
        platformSmallTallAppeared = false

        cumulativeOffset += calcOffset
        // Reset calc offset after used
        calcOffset = 0
        // Calc offset is equal to sum of current image's width and random distance (if it exists)
        // between current image and the next one
        calcOffset += platformWidth

        const randomDistance = getRandomNumber(0, 200)
        // Ensure 2 platforms're not very near if there's distance between them
        if (randomDistance >= 150) {
          calcOffset += randomDistance
        }

        position = {
          x: cumulativeOffset,
          y: window.innerHeight - (platformHeight as number),
        }
      } else {
        image = platformSmallTallImage
        platformSmallTallAppeared = true

        position = {
          x: cumulativeOffset + platformWidth - platformSmallTallWidth,
          y:
            window.innerHeight -
            ((platformSmallTallHeight + platformHeight) as number),
        }
      }

      return new Platform({
        position,
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
