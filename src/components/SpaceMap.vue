<template>
  <canvas ref="map"></canvas>
</template>

<script>
import Vector2 from './classes/Vector2.js'
import Ship from './classes/Ship.js'
import Sprite from './classes/Sprite.js'
import Sprites from './sprites.json'

export default {
  name: 'SpaceMap',
  data() {
    return {
      model: {
        camera: {
          position: new Vector2(0, 0)
        },
        entities: []
      },
      resources: {
        sprites: []
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    for (let sprite of Sprites) {
      this.resources.sprites.push(
        new Sprite(
          sprite.id,
          sprite.size,
          sprite.name,
          sprite.desc,
          sprite.src)
          );
        }

        // Create player ship
        this.model.entities.push(new Ship(this.resources.sprites[1], {
          position: new Vector2(0, 0),
          velocity: new Vector2(10.0, 0),
          acceleration: new Vector2(0, 0),
          omega: 0.0,
          rotation: 0.0
        }));
        this.model.entities[0].pose.position.x = this.canvas.width / 2;
        this.model.entities[0].pose.position.y = this.canvas.height / 2;

        // Create enemy ships
        for (let i = 0; i < 10; i++) {
          this.model.entities.push(new Ship(this.resources.sprites[0], {
            position: new Vector2(0, 0),
            velocity: new Vector2(0, 0),
            acceleration: new Vector2(0, 0),
            rotation: 0.0
          }));
          this.model.entities[i + 1].pose.position.x = Math.random() * 1000 - 500;
          this.model.entities[i + 1].pose.position.y = Math.random() * 1000 - 500;
          this.model.entities[i + 1].pose.rotation = Math.random() * Math.PI * 2;
        }

        window.addEventListener('mousedown', this.handleMouseControl);
        window.requestAnimationFrame(this.draw);
      },
      computed: {
        canvas: function () {
          return this.$refs.map;
        },
        ctx: function () {
          return this.canvas.getContext('2d');
        }
      },
      methods: {
        handleResize() {
          this.canvas.width = window.innerWidth;
          this.canvas.height = window.innerHeight;
        },
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Update camera pose.
      this.model.camera.position.x = this.model.entities[0].pose.position.x;
      this.model.camera.position.y = this.model.entities[0].pose.position.y;

      // Draw entities.
      for (let entity of this.model.entities) {
        this.drawEntity(entity);
        entity.update(0.01);
      }

      window.requestAnimationFrame(this.draw);
    },
    drawEntity(entity) {
      if (entity instanceof Ship) {
        entity.pose.omega = Math.atan2(entity.pose.velocity.y, entity.pose.velocity.x) + Math.PI / 2;
      }

      console.log("Canvas Dimensions: " + this.canvas.width + "x" + this.canvas.height);

      const x = entity.pose.position.x - this.model.camera.position.x + this.canvas.width/2;
      const y = entity.pose.position.y - this.model.camera.position.y + this.canvas.height/2;
      const size = [entity.sprite.size[0], entity.sprite.size[1]];

      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.rotate(entity.pose.rotation);
      this.ctx.drawImage(
        entity.sprite.image,
        -size[0]/2, -size[1]/2,
        size[0], size[1])
      this.ctx.restore();
    },
    handleMouseControl(e) {
      console.log("Button Event!")
      let mousePos = new Vector2(e.clientX, e.clientY);
      mousePos.x -= this.canvas.width / 2;
      mousePos.y -= this.canvas.height / 2;
      const acceleration = Vector2.scale(mousePos, 2.0);
      this.model.entities[0].pose.acceleration = acceleration;
    }
  }
}
</script>

<style>
#map {
  position: absolute;
  border: none;
}
</style>