import { Model } from '@team-decorate/alcjs'

const FILLABEL = [
  'x', 'y', 'vx', 'vy'
]

export default class Block extends Model {
  constructor (data = null) {
    super()
    this.fillable = FILLABEL

    this.x = 900
    this.y = null
    this.vx = -2
    this.vy = 0


    this.data = data

  }

  get _model () {
    return 'Block'
  }


  /**
   * ポジション更新
   */
  updatePosition() {
    this.x += this.vx;
    this.y += this.vy;
  }

  /**
   * 重力加算
   * @param entity
   * @param num
   */
  applyGravity(num=0.15) {
    this.vy +=num;
  }

  /**
   * ジャンプ
   * @param entity
   */
  applyJump(entity) {
    this.vy = -5;
  }

  /**
   * 描画
   * @param p5
   */
  drawBlock(p5) {
    p5.noStroke()
    p5.fill("#ffb677")
    p5.rect(this.x, this.y, 80, 400);
  }
}
