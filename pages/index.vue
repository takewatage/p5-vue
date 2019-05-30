<template>
  <section class="container">
    <div class="d-flex justify-content-center" id="p5Canvas"></div>
  </section>
</template>

<script>

export default {
  data () {
    return {
      size: {
        x: 640,
        y: 640,
      },
      node: {
        x: 0,
        y: 0,
        radius: 0
      }
    }
  },
  
  mounted() {    
    
    const script =  (p5) => {
      let speed = 2;
      let posX = 0;
      let nodes = []      
      
      p5.setup = _ => {
        let canvas = p5.createCanvas(this.size.x, this.size.y)
        canvas.parent("p5Canvas");

        p5.smooth(4);
        // 50個ノードを作成
        for (let i = 0; i < 50; i++) {          
          nodes[i] = this.makeNode(this.size.x, this.size.y)
        }        
      }

      p5.draw = _ => {
        p5.fill(0, 0, 50, 80);
        p5.rect(0, 0, 640, 640);
              
        for (let i = 0; i < 50; i++) {
          this.node = nodes[i];
          nodeShow(this.node)
        }  
      }

      function nodeShow(node) {
        p5.fill(255, 255,255, 255)
        // xy座標に、半径radiusの円を表示
        p5.ellipse(node.x, node.y, node.radius, node.radius);
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
      node.radius = 8;      
      return node
    }
  },
}
</script>
