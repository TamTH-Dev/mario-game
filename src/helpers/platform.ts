import { ICoordinate } from '../types'
import { Platform, Player } from '../objects'

export function processPlatforms(platforms: Platform[], player: Player) {
  const playerPosition = player.getPosition()
  const playerVelocity = player.getVelocity()
  const { playerWidth, playerHeight } = player.getSize()
  const { standOn } = player.getActions()

  platforms.forEach(platform => {
    platform.draw()
    standOnPlatform(platform, {
      playerPosition,
      playerVelocity,
      playerWidth,
      playerHeight,
      standOn,
    })
    translatePlatform(platform, player)
  })
}

function standOnPlatform(
  platform: Platform,
  {
    playerPosition,
    playerVelocity,
    playerWidth,
    playerHeight,
    standOn,
  }: {
    playerPosition: ICoordinate
    playerVelocity: ICoordinate
    playerWidth: number
    playerHeight: number
    standOn: () => void
  }
) {
  const platformPosition = platform.getPosition()
  const { platformWidth } = platform.getSize()

  if (
    playerPosition.y + playerHeight <= platformPosition.y &&
    playerPosition.y + playerHeight + playerVelocity.y >= platformPosition.y &&
    playerPosition.x + playerWidth >= platformPosition.x &&
    playerPosition.x <= platformPosition.x + platformWidth
  ) {
    standOn()
  }
}

function translatePlatform(platform: Platform, player: Player) {
  if (
    player.getKeysState().rightKey.pressed &&
    player.getVelocity().x === 0 &&
    player.getPosition().x >= 400
  ) {
    platform.translateToLeftSide()
  }

  if (
    player.getKeysState().leftKey.pressed &&
    player.getVelocity().x === 0 &&
    player.getPosition().x <= 100
  ) {
    platform.translateToRightSide()
  }
}
