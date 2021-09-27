<template>
  <table style="text-align: center">
    <tr>
      <td>Year</td>
      <td><input type="number" class="input-length" v-model="year" /></td>
    </tr>
    <tr>
      <td>Month</td>
      <td><input type="number" class="input-length" v-model="month" /></td>
    </tr>
    <tr>
      <td>Day</td>
      <td><input type="number" class="input-length" v-model="day" /></td>
    </tr>
    <tr>
      <td>Hour</td>
      <td><input type="number" class="input-length" v-model="hour" /></td>
    </tr>
    <tr>
      <td>Minute</td>
      <td><input type="number" class="input-length" v-model="min" /></td>
    </tr>
    <tr>
      <td>Second</td>
      <td><input type="number" class="input-length" v-model="sec" /></td>
    </tr>
  </table>
  <br />
  JWT-Time: {{ jwtTime }}
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup: () => {
    const now = new Date();
    const year = ref(now.getFullYear());
    const month = ref(now.getMonth() + 1);
    const day = ref(now.getDate());
    const hour = ref(now.getHours());
    const min = ref(now.getMinutes());
    const sec = ref(now.getSeconds());
    const jwtTime = computed(
      () =>
        new Date(
          year.value,
          month.value - 1,
          day.value,
          hour.value,
          min.value,
          sec.value
        ).getTime() / 1000
    );

    return {
      year,
      month,
      day,
      hour,
      min,
      sec,
      jwtTime,
    };
  },
});
</script>

<style>
.input-length {
  width: 50px;
}
</style>
