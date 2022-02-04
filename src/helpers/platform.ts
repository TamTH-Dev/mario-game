import { ICoordinate } from '../types'
import { Platform, Player } from '../objects'
import {
  GAME_TRANSLATE_FACTOR,
  PLAYER_MIN_X_OFFSET,
  PLAYER_MAX_X_OFFSET,
} from '../helpers'

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
    player.getPosition().x >= PLAYER_MAX_X_OFFSET
  ) {
    platform.translateToLeftSide()
    window.translateOffset += GAME_TRANSLATE_FACTOR
  }

  if (
    player.getKeysState().leftKey.pressed &&
    player.getVelocity().x === 0 &&
    player.getPosition().x <= PLAYER_MIN_X_OFFSET &&
    window.translateOffset > 0
  ) {
    platform.translateToRightSide()
    window.translateOffset -= GAME_TRANSLATE_FACTOR
  }
}
