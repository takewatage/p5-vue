import { Model } from '@team-decorate/alcjs'

const FILLABEL = [
  'x', 'y', 'vx', 'vy', 'width', 'height'
]

export default class Block extends Model {
  constructor (data = null) {
    super()
    this.fillable = FILLABEL

    this.vx = -2
    this.vy = 0
    this.width = 40
    this.height = (window.innerHeight / 4)
    this.x = window.innerWidth + this.width
    this.y = window.innerHeight - this.height / 2

    this.data = data

  }

  get _model () {
    return 'Block'
  }

  /**
   * ブロックの位置が画面内なら true を返す
   * @returns {boolean}
   */
  get blockIsAlive() {
    return 0 - (this.width / 2) < this.x;
  }


  /**
   * ポジション更新
   */
  updatePosition() {
    this.x += this.vx;
    this.y += this.vy;
  }


  /**
   * 描画
   * @param p5
   */
  drawBlock(p5) {
    p5.noStroke()
    p5.fill("#ffb677")
    p5.rect(this.x, this.y, this.width, (window.innerHeight / 2) +100);
  }
}
