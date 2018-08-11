<template>
<gmap-map :center="center"
          :zoom="16"
          map-type-id="terrain"
          :class="$style.map">
  <gmap-marker v-for="(m, index) in markers"
               :key="index"
               :position="m.position"
               :label="m.label"
               :clickable="true"
               :draggable="true"
               @click="center=m.position" />
</gmap-map>
</template>

<script>
export default {
  props: {
    results: { type: Array, required: true },
  },
  data: () => ({
    center: { lat:38.6524067, lng:-90.4377085 },
  }),
  computed: {
    markers() {
      return this.results.map((result) => ({
        position: result.position,
        label: {
          text: result.text,
        },
      }));
    },
  },
};
</script>

<style lang="scss" module>
.map {
  display: inline-block;
  width: 40%;
  height: 300px;
}
</style>
