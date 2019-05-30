<template>
  <section class="container">
    <div class="d-flex justify-content-center" id="p5Canvas"></div>

    <!-- <input type="number" v-model="nodeNum" /> -->
  </section>
</template>

<script>

export default {
  data () {
    return {
      node: {
        x: 0,
        y: 0,
        // x座標の速度
        vx: 0,
        // y座標の速度
        vy: 0,
        radius: 0
      },
      nodeNum: 50
    }
  },
  
  mounted() {    
    
    const script =  (p5) => {
      let speed = 2;
      let posX = 0;
      let nodes = []  
      //canvasのおおきさ
      const width = 640
      const height = 640

      let node1 = this.node
      let node2 = this.node

      const nodeNum = this.nodeNum
      
      p5.setup = _ => {
        let canvas = p5.createCanvas(width, height)
        canvas.parent("p5Canvas");

        p5.smooth(4);
        // 50個ノードを作成
        for (let i = 0; i < this.nodeNum; i++) {          
          nodes[i] = this.makeNode(width, height)
        }        
      }

      p5.draw = _ => {
        p5.fill(0, 0, 50, 80);
        p5.rect(0, 0, 640, 640);
              
        //ノード表示
        for (let i = 0; i < this.nodeNum; i++) {
          this.node = nodes[i];
          nodeShow(this.node)
        }
        //アーク表示
        for (let i = 0; i < this.nodeNum -1; i++) {
          node1 = nodes[i];
          for (let j = 0; j < this.nodeNum; j++) {
            node2 = nodes[j];
            showSpring(node1, node2);
          }
        }
      }

      //ノード表示
      function nodeShow(item) {
        const node = update(item)

        p5.fill(255, 255,255, 255)
        // xy座標に、半径radiusの円を表示
        p5.ellipse(node.x, node.y, node.radius, node.radius);
      }

      function update(node) {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x > width) {
          node.x = 0;
        } else if (node.x < 0) {
          node.x = width;
        }
        if (node.y > height) {
          node.y = 0;
        } else if (node.y < 0) {
          node.y = height;
        }
        
        return node
      }

      function showSpring(n1, n2) {
        //２点の絶対値
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        //2つの距離(ピタゴラス)
        const distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
        // ノード間が100ピクセル以内ならバネを表示します。
        if (distance < 100) {
          p5.stroke(255, 255, 255, 255);
          p5.line(n1.x, n1.y, n2.x, n2.y);
        }
        
      }
    }

    const P5 = require('p5')
    new P5(script)
  },

  methods: {
    makeNode(max_x, max_y) {      
      const node = new Object()
      node.x = Math.random() * (max_x - 1) + 1;
      node.y = Math.random() * (max_y - 1) + 1;
      node.vx = (Math.random()*1)-0.5
      node.vy = (Math.random()*1)-0.5
      node.radius = 8;   

      return node
    }
  },
}
</script>
