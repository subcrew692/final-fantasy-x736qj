<template>
  <div>
    <JwtConverter/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JwtConverter from './components/JwtConverter.vue';

export default defineComponent({
  name: 'App',
  components: {
    JwtConverter
  },
  setup() {},
});
</script>

<style></style>
