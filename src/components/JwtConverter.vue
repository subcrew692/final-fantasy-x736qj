<template>
  <div class="flex-container">
    <div class="flex-option">
    <div class="item">goodboy</div>
    <div class="item">goodgirl</div>
    </div>
    <div class="item">goodboy</div>
    <div class="item">goodgirl</div>
    <!-- <div class="year">
      Year
    </div>
    <div class="year year-space"><input type="number" class="input-length" v-model="year" /></div>
    <div class="year"></div> -->
    <!-- <div class="month">
      Month
    </div>
    <div class="month2"><input type="number" class="input-length" v-model="month" /></div>
    <div class="item">Day <input type="number" class="input-length" v-model="day" /></div>
    <div class="item">Hour <input type="number" class="input-length" v-model="hour" /></div>
    <div class="item">Minute <input type="number" class="input-length" v-model="min" /></div>
    <div class="item">Second <input type="number" class="input-length" v-model="sec" /></div> -->
    <!-- JWT-Time: {{ jwtTime }} -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'JwtConverter',
  setup() {
    const now = new Date();
    const year = ref(now.getFullYear());
    const month = ref(now.getMonth() + 1);
    const day = ref(now.getDate());
    const hour = ref(now.getHours());
    const min = ref(now.getMinutes());
    const sec = ref(now.getSeconds());
    const jwtTime = computed(() => new Date(year.value, month.value - 1, day.value, hour.value, min.value, sec.value).getTime() / 1000);

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
.flex-container {
  height: 300px;
  display: flex;
  background-color: royalblue;
  padding: 15px;
  flex-wrap: wrap;
}
.item {
  flex: 1;
  background-color: #f08bc3;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
}
.flex-2 {
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: 60%;
  background-color: #f08bc3;
}
</style>
