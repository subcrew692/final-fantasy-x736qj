<template>
  <q-input color="teal" outlined v-model="theModel.matchTime" label="MatchTime" clearable :rules="timeRule" />
  <q-input color="teal" outlined v-model="theModel.remainingTime" label="RemainingTime" clearable />
  <q-input color="teal" outlined v-model="theModel.remainingTimeInPeriod" label="RemainingTimeInPeriod" clearable />
  <q-input color="teal" outlined v-model="theModel.stoppageTime" label="StoppageTime" clearable />
  <q-input color="teal" outlined v-model="theModel.stoppageTimeAnnounced" label="StoppageTimeAnnounced" clearable />
  <q-toggle v-model="theModel.stopped" label="Stopped" left-label />
</template>
<script lang="ts">
import { Sports } from '@/models/enum';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'MatchClock',
  props: {
    sportId: { type: Number, required: true },
    rule: { type: Function, required: true },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const timeReg = new RegExp(/^[\d]+(:)+[0-9]+[0-9]+$/);
    const timeRule = [(val) => (!!val && timeReg.test(val)) || 'Invalid Format. ex: 12:34'];
    const theModel = computed(() => props.modelValue);
    theModel.value.remainingTime = null;
    theModel.value.remainingTimeInPeriod = null;
    theModel.value.stopped = false;
    return { timeRule, theModel };
  },
});
</script>
