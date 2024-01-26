<template>
  <NoiseOverlay id="map"/>
  <SpaceMap/>
</template>

<script>
import NoiseOverlay from './components/NoiseOverlay.vue'
import SpaceMap from './components/SpaceMap.vue'

export default {
  name: 'App',
  components: {
    NoiseOverlay,
    SpaceMap
  },
  data() {
    return {
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  methods: {
    onResize() {
    }
  }
}
</script>

<style>
body {
  background-color: rgb(0, 0, 0);
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}
</style>
