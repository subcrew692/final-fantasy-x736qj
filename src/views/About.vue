<template>
  <div>
    <p id="download-status">{{ loadingStatus }}</p>
    <img
      id="big-image"
      src="https://effigis.com/wp-content/uploads/2015/02/DigitalGlobe_WorldView1_50cm_8bit_BW_DRA_Bangkok_Thailand_2009JAN06_8bits_sub_r_1.jpg"
      style="display: none"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'About',
  setup() {
    const loadingStatus = ref('loading...');
    onMounted(() => {
      const image = document.getElementById('big-image');
      image && (image.onload = () => (loadingStatus.value = 'downloaded'));
    });
    return { loadingStatus };
  },
});
</script>
