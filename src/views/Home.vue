<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <div id="timer"></div>
  </div>
</template>

<script lang="ts">
import { createApp, defineComponent, h } from 'vue';
import timer from '@/components/Timer.vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    console.log('Home console');
  },
  mounted() {
    const countdown = createApp({
      render: () => h(timer),
    }).mount('#timer');
  },
});
</script>
