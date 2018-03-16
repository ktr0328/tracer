<template>
  <div id="background">
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import P5 from 'p5'

export default {
  name: 'background',
  data () {
    return {
      mouse: {
        x: 0,
        y: 0
      },
      particles: [
        {x: 0, y: 0, angle: 0, color: [255, 255, 0, 10], size: 1},
        {x: 0, y: 0, angle: 5, color: [255, 255, 0, 20], size: 2},
        {x: 0, y: 0, angle: 10, color: [255, 255, 0, 30], size: 3},
        {x: 0, y: 0, angle: 15, color: [255, 255, 0, 40], size: 4},
        {x: 0, y: 0, angle: 20, color: [255, 255, 0, 50], size: 5},
        {x: 0, y: 0, angle: 25, color: [255, 255, 0, 60], size: 6},
        {x: 0, y: 0, angle: 30, color: [255, 255, 0, 70], size: 7},
        {x: 0, y: 0, angle: 35, color: [255, 255, 0, 80], size: 8},
        {x: 0, y: 0, angle: 40, color: [255, 255, 0, 90], size: 9},
        {x: 0, y: 0, angle: 45, color: [255, 255, 0, 100], size: 10},

        {x: 0, y: 0, angle: 90, color: [255, 0, 0, 10], size: 1},
        {x: 0, y: 0, angle: 95, color: [255, 0, 0, 20], size: 2},
        {x: 0, y: 0, angle: 100, color: [255, 0, 0, 30], size: 3},
        {x: 0, y: 0, angle: 105, color: [255, 0, 0, 40], size: 4},
        {x: 0, y: 0, angle: 110, color: [255, 0, 0, 50], size: 5},
        {x: 0, y: 0, angle: 115, color: [255, 0, 0, 60], size: 6},
        {x: 0, y: 0, angle: 120, color: [255, 0, 0, 70], size: 7},
        {x: 0, y: 0, angle: 125, color: [255, 0, 0, 80], size: 8},
        {x: 0, y: 0, angle: 130, color: [255, 0, 0, 90], size: 9},
        {x: 0, y: 0, angle: 135, color: [255, 0, 0, 100], size: 10},

        {x: 0, y: 0, angle: 180, color: [0, 255, 255, 10], size: 1},
        {x: 0, y: 0, angle: 185, color: [0, 255, 255, 20], size: 2},
        {x: 0, y: 0, angle: 190, color: [0, 255, 255, 30], size: 3},
        {x: 0, y: 0, angle: 195, color: [0, 255, 255, 40], size: 4},
        {x: 0, y: 0, angle: 200, color: [0, 255, 255, 50], size: 5},
        {x: 0, y: 0, angle: 205, color: [0, 255, 255, 60], size: 6},
        {x: 0, y: 0, angle: 210, color: [0, 255, 255, 70], size: 7},
        {x: 0, y: 0, angle: 215, color: [0, 255, 255, 80], size: 8},
        {x: 0, y: 0, angle: 220, color: [0, 255, 255, 90], size: 9},
        {x: 0, y: 0, angle: 225, color: [0, 255, 255, 100], size: 10},

        {x: 0, y: 0, angle: 270, color: [255, 0, 255, 10], size: 1},
        {x: 0, y: 0, angle: 275, color: [255, 0, 255, 20], size: 2},
        {x: 0, y: 0, angle: 280, color: [255, 0, 255, 30], size: 3},
        {x: 0, y: 0, angle: 285, color: [255, 0, 255, 40], size: 4},
        {x: 0, y: 0, angle: 290, color: [255, 0, 255, 50], size: 5},
        {x: 0, y: 0, angle: 295, color: [255, 0, 255, 60], size: 6},
        {x: 0, y: 0, angle: 300, color: [255, 0, 255, 70], size: 7},
        {x: 0, y: 0, angle: 305, color: [255, 0, 255, 80], size: 8},
        {x: 0, y: 0, angle: 310, color: [255, 0, 255, 90], size: 9},
        {x: 0, y: 0, angle: 315, color: [255, 0, 255, 100], size: 10}
      ],
      config: {
        r: 150
      }
    }
  },
  methods: {
    sketch: function (p) {
      p.setup = () => {
        p.background(0, 0, 0, 100)
        p.createCanvas(document.body.clientWidth, document.body.clientHeight)
      }

      p.draw = () => {
        p.clear()
        p.noStroke()

        p.ellipseMode(p.CENTER)
        this.particles.forEach(e => {
          if (this.getDistance(e.x, e.y, this.mouse.x, this.mouse.y) > 250) {
            e.x = e.x + (this.mouse.x - e.x) / 20
            e.y = e.y + (this.mouse.y - e.y) / 20
          } else {
            let tx = this.mouse.x + Math.cos(Math.PI / 180 * e.angle) * this.config.r
            let ty = this.mouse.y + Math.sin(Math.PI / 180 * e.angle) * this.config.r

            tx = e.x + (tx - e.x) / 35
            ty = e.y + (ty - e.y) / 35

            e.x = tx
            e.y = ty
          }
          e.angle += 3
          p.fill(e.color)
          p.ellipse(e.x, e.y, e.size, e.size)
        })
      }
    },
    getDistance: function (x1, y1, x2, y2) {
      return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    }
  },
  mounted: function () {
    // eslint-disable-next-line no-new
    new P5(this.sketch)

    ipcRenderer.on('mouse', (ev, point) => {
      this.mouse.x = point.x
      this.mouse.y = point.y - 23
      console.log(this.mouse.x, this.mouse.y)
    })
    document.body.addEventListener('click', e => {
      console.log(e.clientX, e.clientY)
    })
  }
}
</script>

<style></style>
