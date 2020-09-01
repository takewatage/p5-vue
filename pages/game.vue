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
              height: 0,
              gameState: '' // ゲームの状態。"play" か "gameover"
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
                  switch (this.gameState) {
                      case "play":
                          // プレイ中の状態ならプレイヤーをジャンプさせる
                          this.player.applyJump()
                          break;
                      case "gameover":
                          // ゲームオーバー状態ならリセット
                          this.resetGame()
                          break;
                  }
              }

              return p5

          },

          /** ゲームの初期化・リセット */
          resetGame() {
              this.player = new Player()

              this.blocks = []

              this.gameState = "play";

          },

          /**
           * ゲーム更新
          */
          updateGame(p5) {
              if (this.gameState === "gameover") return;

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

              // プレイヤーが死んでいたらゲームオーバー
              if (!this.player.playerIsAlive) this.gameState = "gameover";
          },

          /** ゲーム描画 */
          drawGame(p5) {
              // エンティティを描画
              p5.background(0)
              this.player.drawPlayer(p5)
              for (let block of this.blocks) block.drawBlock(p5);

              // ゲームオーバーならそれ用の画面を表示
              if (this.gameState === "gameover") this.drawGameoverScreen(p5);
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

          /**
           * ゲームオーバー画面描画
           */
          drawGameoverScreen(p5) {
              p5.background(0, 192); // 透明度 192 の黒
              p5.fill(255);
              p5.textSize(64);
              p5.textAlign(p5.CENTER, p5.CENTER); // 横に中央揃え ＆ 縦にも中央揃え
              p5.text("GAME OVER", p5.width / 2, p5.height / 2); // 画面中央にテキスト表示
          },

          makeP5(script) {
              const P5 = require('p5')
              new P5(script)
          },

      },
  }
</script>
