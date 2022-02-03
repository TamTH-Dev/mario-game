export function getPlatformPosition() {
  const windowHeight = window.innerHeight
  const minX = 100
  const maxX = 800
  // const minY = 100
  // const maxY = 400

  const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX
  // const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY

  return {
    position: {
      x,
      y: windowHeight - 100,
    },
  }
}
