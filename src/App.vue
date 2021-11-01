<template>
  <div>
    <Calculate />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Calculate from './components/Calculate.vue';

export default defineComponent({
  name: 'App',
  components: {
    Calculate,
  },
  setup() {},
});
</script>

<style></style>
