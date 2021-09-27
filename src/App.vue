<template>
  <div>
    <JwtConverter />
  </div>
  <div>Testing</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import JwtConverter from './components/JwtConverter.vue';

export default defineComponent({
  name: 'App',
  setup: () => {
    return {};
  },
});
</script>

<style></style>
