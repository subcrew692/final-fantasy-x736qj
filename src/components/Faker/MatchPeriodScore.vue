<template>
  <q-select outlined v-model="theModel.scoreType" :options="scoreTypeList" clearable label="ScoreType" emit-value map-options></q-select>
  <q-input color="teal" outlined v-model.number="theModel.homeScore" label="HomeScore" clearable />
  <q-input color="teal" outlined v-model.number="theModel.awayScore" label="AwayScore" clearable />
  <q-input color="teal" outlined v-model.number="theModel.periodId" label="PeriodId" clearable />
</template>
<script lang="ts">
import { ScoreType, Sports, ISelectOption } from '@/models/enum';
import { computed, defineComponent } from 'vue';

interface IScoreTypeMapper {
  [key: number]: ScoreType[];
}

const scoreTypeMapper: IScoreTypeMapper = {
  [Sports.Soccer]: [ScoreType.Goals, ScoreType.Corners, ScoreType.RedCards, ScoreType.YellowCards, ScoreType.YellowRedCards, ScoreType.Cards, ScoreType.Proposition],
  [Sports.Basketball]: [ScoreType.Point, ScoreType.Proposition],
  [Sports.Tennis]: [ScoreType.Set, ScoreType.Game, ScoreType.GamePoint, ScoreType.Proposition],
  [Sports.TableTennis]: [ScoreType.Game, ScoreType.GamePoint, ScoreType.Proposition],
  [Sports.Volleyball]: [ScoreType.VolleyballSet, ScoreType.VolleyballPoint, ScoreType.Proposition],
  [Sports.Baseball]: [ScoreType.BaseballRun, ScoreType.BaseballOut],
};

function filterScoreType(sportId: number): ISelectOption[] {
  return Object.entries(ScoreType)
    .filter((x) => {
      if (typeof x[1] !== 'number') {
        return false;
      }
      const mapper = scoreTypeMapper[sportId];
      return mapper && mapper.includes(x[1]);
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
