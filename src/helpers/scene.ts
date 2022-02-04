import { Player, Scene } from '../objects'
import { PLAYER_MIN_X_OFFSET, PLAYER_MAX_X_OFFSET } from '../helpers'

export function processScenes(scenes: Scene[], player: Player) {
  scenes.forEach(scene => {
    scene.draw()
    translateScene(scene, player)
  })
}

function translateScene(scene: Scene, player: Player) {
  if (
    player.getKeysState().rightKey.pressed &&
    player.getVelocity().x === 0 &&
    player.getPosition().x >= PLAYER_MAX_X_OFFSET
  ) {
    scene.translateToLeftSide()
  }

  if (
    player.getKeysState().leftKey.pressed &&
    player.getVelocity().x === 0 &&
    player.getPosition().x <= PLAYER_MIN_X_OFFSET &&
    window.translateOffset > 0
  ) {
    scene.translateToRightSide()
  }
}
