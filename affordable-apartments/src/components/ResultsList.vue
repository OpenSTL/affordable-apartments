<template>
<ul :class="$style.results">
  <li v-for="result in results" :result="result">
    {{ result.text }}
  </li>
</ul>
</template>

<script>
export default {
  props: {
    results: { type: Array, required: true },
  },
};
</script>

<style lang="scss" module>
.results {
  list-style: none;
  margin: 0;
  padding: 0 1em 1em 0;

  li {
    margin-top: 1em;
    padding: 0.5em;
    background-color: #f8f8f8;
  }
}
</style>
