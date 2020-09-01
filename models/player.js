import { Model } from '@team-decorate/alcjs'

const FILLABEL = [
  'x', 'y', 'vx', 'vy'
]

export default class Player extends Model {
  constructor (data = null) {
    super()
    this.fillable = FILLABEL

    this.x = 200
    this.y = 300
    this.vx = 0
    this.vy = 0


    this.data = data

  }

  get _model () {
    return 'Player'
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

  drawPlayer(p5) {
    p5.noStroke()
    p5.fill("#5f6caf");
    p5.square(this.x, this.y, 40);
  }
}
