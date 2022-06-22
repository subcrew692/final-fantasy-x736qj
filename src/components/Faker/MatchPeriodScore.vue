<template>
  <q-select outlined v-model="theModel.scoreType" :options="scoreTypeList" clearable label="ScoreType" emit-value map-options></q-select>
  <q-input color="teal" outlined v-model.number="theModel.homeScore" label="HomeScore" clearable />
  <q-input color="teal" outlined v-model.number="theModel.awayScore" label="AwayScore" clearable />
  <q-input color="teal" outlined v-model.number="theModel.periodId" label="PeriodId" clearable />
</template>
<script lang="ts">
import { ScoreType, Sports, ISelectOption } from '@/models/enum';
import { computed, defineComponent } from 'vue';

function filterScoreType(sportId: number): ISelectOption[] {
  return Object.entries(ScoreType)
    .filter((x) => {
      if (typeof x[1] !== 'number') {
        return false;
      }
      switch (sportId) {
        case Sports.Soccer:
          return x[1] <= 5;
        case Sports.Basketball:
          return x[1] === ScoreType.Point;
        case Sports.Tennis:
          return x[1] >= ScoreType.Set && x[1] <= ScoreType.GamePoint;
        case Sports.TableTennis:
        case Sports.Volleyball:
          return x[1] >= ScoreType.Game && x[1] <= ScoreType.GamePoint;
        default:
          return x[1] === ScoreType.Proposition;
      }
    })
    .map((a) => ({ value: a[1] as number, label: a[0] }));
}

export default defineComponent({
  name: 'MatchPeriodScore',
  props: {
    sportId: { type: Number, required: true },
    rule: { type: Function, required: true },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const scoreTypeList = computed(() => filterScoreType(props.sportId));
    const theModel = computed(() => props.modelValue);
    return { scoreTypeList, theModel };
  },
});
</script>
