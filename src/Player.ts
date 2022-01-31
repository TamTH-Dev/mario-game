class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    }
    this.velocity = {
      x: 0,
      y: 1,
    }
    this.width = 30
    this.height = 30
  }

  setContext(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
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

export default Player
