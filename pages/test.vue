<template>
  <section>
    <div id="p5Canvas"></div>
  </section>
</template>

<script>

  import Player from '../models/player'
  import Block from "../models/block"
  import linq from 'linq'

  export default {
      data () {
          return {
              player: undefined,
              block: undefined,
              blocks: [],
              width: 0,
              height: 0
          }
      },

      mounted() {
          this.width = window.innerWidth
          this.height = window.innerHeight
          const script = (p5) => this.p5(p5)
          this.makeP5(script)
      },

      methods: {
          p5(p5) {
              // const width = window.innerWidth
              // const height = window.innerHeight


              p5.setup = () => {
                  let canvas = p5.createCanvas(this.width, this.height)
                  canvas.parent("p5Canvas");

                  p5.rectMode(p5.CENTER);

                  this.resetGame(p5)
              }


              //描画
              p5.draw = _ => {
                  this.updateGame(p5)
                  this.drawGame(p5)
              }

              //マウスクリック処理
              p5.mouseClicked = _=> {
                  this.player.applyJump();
              }

              p5.keyTyped = _=> {
                  console.log(`blocks: ${this.blocks.length}`);
              }

              return p5

          },

          /** ゲームの初期化・リセット */
          resetGame() {
              // プレイヤーを作成
              this.player = new Player()

              // 初期ブロックを作成
              this.blocks.push( new Block({
                  width: this.width,
                  x: this.width / 2
              }))
          },

          /**
           * ゲーム更新
          */
          updateGame(p5) {
              // ブロックの追加と削除
              // 一定間隔で追加
              if (p5.frameCount % 80 === 1) {
                  this.addBlockPair(p5);
              }
              // 範囲外になったら削除
              this.blocks = linq.from(this.blocks).where(x => {
                  if(x.blockIsAlive) return x
              }).toArray()

              // エンティティの位置を更新
              this.player.updatePosition()
              for(let block of this.blocks)  block.updatePosition();

              // プレイヤーに重力を適用
              this.player.applyGravity()
          },

          /** ゲーム描画 */
          drawGame(p5) {
              // エンティティを描画
              p5.background(0)
              this.player.drawPlayer(p5)
              for (let block of this.blocks) block.drawBlock(p5);
          },

          /**
           * ブロック追加
           */
          addBlockPair(p5) {
              const height = window.innerHeight
              let y = p5.random(-100, 100);
              this.blocks.push(new Block({y: y}));　// 下のブロック
              this.blocks.push(new Block({y: y + height})); // 上のブロック
              // console.log(this.blocks)
          },

          makeP5(script) {
              const P5 = require('p5')
              new P5(script)
          },

      },
  }
</script>
