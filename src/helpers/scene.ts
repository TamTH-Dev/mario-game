import { Player, Scene } from '../objects'

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
    player.getPosition().x >= 400
  ) {
    scene.translateToLeftSide()
  }

  if (
    player.getKeysState().leftKey.pressed &&
    player.getVelocity().x === 0 &&
    player.getPosition().x <= 100 &&
    window.translateOffset > 0
  ) {
    scene.translateToRightSide()
  }
}
