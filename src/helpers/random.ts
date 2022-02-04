export function getRandomPlatformPosition(
  image: CanvasImageSource,
  index: number
) {
  const minDistance = 0
  const maxDistance = 100

  const randomDistance =
    Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance

  return {
    x:
      index === 0
        ? 0
        : index * (image.width as number) - index * 3 + randomDistance,
    y: window.innerHeight - (image.height as number),
  }
}
