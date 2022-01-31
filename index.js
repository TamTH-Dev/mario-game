import Player from './Player.js'

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const player = new Player()
console.log(player, ctx)
