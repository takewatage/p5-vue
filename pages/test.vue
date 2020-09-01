<template>
  <section>
    <div id="p5Canvas"></div>
  </section>
</template>

<script>

  import Player from '../models/player'
  import Block from "../models/block";

    export default {
        data () {
            return {
                player: undefined,
                block: undefined
            }
        },

        mounted() {
            const script = (p5) => this.p5(p5)
            this.makeP5(script)
        },

        methods: {
            p5(p5) {
                //canvasのおおきさ
                const width = window.innerWidth
                const height = window.innerHeight

                p5.setup = () => {
                    let canvas = p5.createCanvas(width, height)
                    canvas.parent("p5Canvas");

                    p5.rectMode(p5.CENTER);

                    // プレイヤーを作成
                    this.player = new Player()

                    // ブロックを作成
                    this.block = new Block({y:300})
                }


                //描画
                p5.draw = _ => {
                    // エンティティの位置を更新
                    this.player.updatePosition()
                    this.block.updatePosition()

                    // プレイヤーに重力を適用
                    this.player.applyGravity()

                    // エンティティを描画
                    p5.background(0)
                    this.player.drawPlayer(p5)
                    this.block.drawBlock(p5)
                }

                //マウスクリック処理
                p5.mouseClicked = _=> {
                    this.player.applyJump();
                }

                return p5

            },

            makeP5(script) {
                const P5 = require('p5')
                new P5(script)
            },

            /**
             * プレイヤー作成
             */
            createPlayer() {

            }
        },
    }
</script>
