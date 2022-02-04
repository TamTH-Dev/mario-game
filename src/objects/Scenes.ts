import Scene from './Scene'
import { BackgroundImage, HillsImage } from '../assets/images'
import { ICoordinate } from '../types'

class Scenes {
  private scenes: Scene[]
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor({
    context,
    numOfScenes = 1,
  }: {
    context: {
      canvas: HTMLCanvasElement
      ctx: CanvasRenderingContext2D
    }
    numOfScenes?: number
  }) {
    this.canvas = context.canvas
    this.ctx = context.ctx
    this.scenes = [...new Array(numOfScenes)].map((_, index: number) => {
      const image = new Image()
      let settings = {} as {
        position: ICoordinate
        isFullHeight?: boolean
      }

      if (index % 2 === 0) {
        image.src = BackgroundImage
        settings = {
          position: {
            x: index * image.width - index * 3,
            y: 0,
          },
          isFullHeight: true,
        }
      } else {
        image.src = HillsImage
        settings = {
          position: {
            x: 0,
            y: window.innerHeight - image.height + 10,
          },
        }
      }

      return new Scene({
        ...settings,
        image,
        context: {
          canvas: this.canvas,
          ctx: this.ctx,
        },
      })
    })
  }

  getScenes() {
    return this.scenes
  }
}

export default Scenes
