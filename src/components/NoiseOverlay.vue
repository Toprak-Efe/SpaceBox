<template>
  <canvas ref='noiseoverlay'></canvas>
</template>

<script>
export default {
  name: 'NoiseOverlay',
  data() {
    return {
      background: 'black',
      noise: {
        imNoise: null
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.imNoise = this.ctx.createImageData(this.canvas.width, this.canvas.height);

    window.requestAnimationFrame(this.draw);
  },
  computed: {
    canvas: function () {
      return this.$refs.noiseoverlay;
    },
    ctx: function () {
      return this.canvas.getContext('2d');
    }
  },
  methods: {
    handleResize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.imNoise = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    },
    draw() {
      let pBuffer = new Uint32Array(this.imNoise.data.buffer);
      for(let i = 0; i < pBuffer.length; i++) {
        if (Math.random() < 0.5) {
          pBuffer[i] = 0x22000000;
        } else {
          pBuffer[i] = 0x11FFFFFF;
        }
      }
      this.ctx.putImageData(this.imNoise, 0, 0);
      window.requestAnimationFrame(this.draw);
    }
  }
}


</script>

<style scoped>
#noiseoverlay {
  position: absolute;
  border: none;
  opacity: 0;
  background: transparent;
  z-index: 50;
  pointer-events: none;
}
</style>
