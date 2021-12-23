<template>
  <div>
    <input type="number" v-model="unixTime" />
    <table style="text-align: center">
      <tr>
        <td>Year</td>
        <td>{{ dateObject.year }}</td>
      </tr>
      <tr>
        <td>Month</td>
        <td>{{ dateObject.month }}</td>
      </tr>
      <tr>
        <td>Day</td>
        <td>{{ dateObject.day }}</td>
      </tr>
      <tr>
        <td>Hour</td>
        <td>{{ dateObject.hour }}</td>
      </tr>
      <tr>
        <td>Minute</td>
        <td>{{ dateObject.min }}</td>
      </tr>
      <tr>
        <td>Second</td>
        <td>{{ dateObject.sec }}</td>
      </tr>
    </table>

    <h1>{{ countDownStr }}</h1>
  </div>
</template>

<script lang="ts">
import { timer } from 'rxjs';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';

interface IDateObject {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
  sec: number;
}

export default defineComponent({
  name: 'JwtConverter',
  setup() {
    const now = new Date();
    const dateToUnixTime = (obj: IDateObject) => new Date(obj.year, obj.month - 1, obj.day, obj.hour, obj.min, obj.sec).getTime() / 1000;
    const unixTime = ref(
      dateToUnixTime({
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hour: now.getHours() + 36,
        min: now.getMinutes(),
        sec: now.getSeconds(),
      }),
    );
    const dateObject = computed(() => {
      const milliseconds = unixTime.value * 1000;
      const date = new Date(milliseconds);
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        min: date.getMinutes(),
        sec: date.getSeconds(),
      };
    });
    const max = 100 * 24 * 60 * 60 * 1000;
    const countDownStr = ref();
    onMounted(() => {
      timer(1000, 1000).subscribe({
        next: () => {
          const present = new Date().getTime();
          const ticks = unixTime.value * 1000 - present;
          if (ticks <= 0) {
            countDownStr.value = '0';
            return;
          }
          if (ticks > max) {
            countDownStr.value = '99:99:99';
            return;
          }
          const secs = Math.floor((ticks / 1000) % 60)
            .toString()
            .padStart(2, '0');
          const mins = Math.floor((ticks / 1000 / 60) % 60)
            .toString()
            .padStart(2, '0');
          const hours = Math.floor((ticks / 1000 / 60 / 60) % 24)
            .toString()
            .padStart(2, '0');
          const days = Math.floor((ticks / 1000 / 60 / 60 / 24) % 60)
            .toString()
            .padStart(2, '0');
          countDownStr.value = `${days}:${hours}:${mins}:${secs}`;
        },
      });
    });

    return {
      unixTime,
      dateObject,
      countDownStr,
    };
  },
});
</script>

<style>
.input-length {
  width: 50px;
}
</style>
