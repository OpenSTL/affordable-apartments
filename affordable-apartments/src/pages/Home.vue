<template>
<div>
  <h1>STL Affordable Housing</h1>
  <div :class="$style.container">
    <div :class="$style.left">
      <form :class="$style.controls">
        <div>
          <label for="min">Min</label>
          <input v-model="min" type="number" id="min" name="min">
        </div>
        <div>
          <label for="max">Max</label>
          <input v-model="max" type="number" id="max" name="max">
        </div>
        <button type="submit">Submit</button>
      </form>
      <results-list :results="results" />
    </div>
    <results-map :class="$style.right" :results="results" />
  </div>
</div>
</template>

<script>
import ResultsList from '../components/ResultsList.vue';
import ResultsMap from '../components/ResultsMap.vue';

export default {
  components: {
    ResultsList,
    ResultsMap,
  },
  metaInfo: {
    title: 'Home',
  },
  data: () => ({
    min: 0,
    max: 500,
    // The results should be retrieved from the server.
    results: [{
      position: { lat:38.6524067, lng:-90.4377085 },
      text: 'test',
    }],
  }),
};
</script>

<style lang="scss" module>
.container {
  display: flex;

  .left {
    width: 60%;
  }

  .right {
    width: 40%;
  }
}

.controls {
  display: flex;

  > div {
    margin-right: 2em;
  }

  input {
    width: 5em;
    text-align: right;
  }
}
</style>
