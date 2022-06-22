<template>
  <q-select outlined v-model="theModel.matchStatus" :options="statusList" clearable label="MatchStatus" emit-value map-options></q-select>
  <div class="row">
    <div class="col-3">
      <q-toggle v-model="theModel.isLive" label="IsLive" left-label />
    </div>
    <div class="col-4">
      <q-toggle v-model="theModel.liveCoverage" label="LiveCoverage" left-label />
    </div>
    <div class="col-5">
      <q-toggle v-model="theModel.neutralGround" label="NeutralGround" left-label />
    </div>
  </div>
  <q-input filled v-model="theModel.matchDate" label="MatchDate">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <div class="q-gutter-md row items-start">
            <q-date v-model="theModel.matchDate" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
            <q-time v-model="theModel.matchDate" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </div>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
  <q-input color="teal" outlined v-model.number="theModel.matchStatusCode" label="MatchStatusCode" clearable />
  <div class="row">
    <div class="col-3" style="align-items: center; justify-content: center; display: flex">CurrentServer</div>
    <div class="col-9">
      <q-radio name="currentServer" v-model="theModel.currentServer" :val="0" label="0" />
      <q-radio name="currentServer" v-model="theModel.currentServer" :val="1" label="1" />
      <q-radio name="currentServer" v-model="theModel.currentServer" :val="2" label="2" />
    </div>
  </div>
</template>
<script lang="ts">
import { MatchStatus, EnumToSelectOptions } from '@/models/enum';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'MatchStatus',
  props: {
    sportId: { type: Number, required: true },
    rule: { type: Function, required: true },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const statusList = EnumToSelectOptions(MatchStatus);
    const theModel = computed(() => props.modelValue);
    theModel.value.isLive = false;
    theModel.value.liveCoverage = false;
    theModel.value.neutralGround = false;
    return { statusList, theModel };
  },
});
</script>
