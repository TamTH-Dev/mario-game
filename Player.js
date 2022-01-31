class Player {
  constructor(ctx) {
    this.position = {
      x: 100,
      y: 100,
    }
    this.width = 30
    this.height = 30
    this.ctx = ctx
  }

  draw() {
    this.ctx.fillStyle = '#ff2200'
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

export default Player
