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
        this.model.entities.push(new Ship(this.resources.sprites[0], {
          position: new Vector2(0, 0),
          velocity: new Vector2(0, 0),
          acceleration: new Vector2(0, 0),
          rotation: 0.0
        }));
        this.model.entities[0].pose.position.x = this.canvas.width / 2;
        this.model.entities[0].pose.position.y = this.canvas.height / 2;

        // Listen for mouse pressdown event
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

      for (let entity of this.model.entities) {
        this.drawEntity(entity);
        entity.update(0.01);
      }

      window.requestAnimationFrame(this.draw);
    },
    drawEntity(entity) {
      this.ctx.save();
      this.ctx.translate(entity.pose.position.x, entity.pose.position.y);
      // Check if entity is ship or not, if ship, calculate rotation angle from speed vector
      if (entity instanceof Ship) {
        entity.pose.rotation = Math.atan2(entity.pose.velocity.y, entity.pose.velocity.x) + Math.PI / 2;
      }
      this.ctx.rotate(entity.pose.rotation);
      this.ctx.drawImage(entity.sprite.image, -entity.sprite.size[0]/2, -entity.sprite.size[1]/2, entity.sprite.size[0], entity.sprite.size[1]);
      this.ctx.restore();
    },
    handleMouseControl(e) {
      const playerPos = this.model.entities[0].pose.position;
      const mousePos = new Vector2(e.clientX, e.clientY);
      const direction = Vector2.subtract(mousePos, playerPos);
      const acceleration = Vector2.scale(Vector2.normalized(direction), 10.0);
      this.model.entities[0].accelerate(acceleration);
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