<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <div class="q-pa-md" style="max-width: 500px">
        <div class="q-gutter-md">
          <q-select outlined v-model="payloadType" :options="payloadList" label="Payload Type" map-options>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-select outlined v-model="sportId" :options="sports" label="Sport" map-options>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input color="teal" outlined v-model.number="matchId" label="MatchId" :rules="inputRule('MatchId')" clearable />
          <component :is="payloadComponent" :sport-id="sportId.value" :rule="inputRule" v-model="payload" />

          <div class="row">
            <div class="col-7">
              <q-btn flat round dense :icon="copyIcon" v-if="displayJsonArea" @click="copyJson()" />
            </div>
            <div class="col-5" style="text-align: right">
              <q-btn color="primary" icon="settings" label="Generate Json" type="submit" />
            </div>
          </div>
        </div>
        <div v-show="displayJsonArea">
          <pre id="jsonOutput" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
<script lang="ts">
import { Sports, WebSocketPayloadType, EnumToSelectOptions, ISelectOption } from '@/models/enum';
import { computed, defineComponent, ref, Ref } from 'vue';
import * as FakerComponent from '@/components/Faker';

interface IPayload {
  matchId: number;
  tick: string;
  matchDate?: string;
}

export default defineComponent({
  name: 'Faker',
  components: { ...FakerComponent },
  setup() {
    const payloadList = EnumToSelectOptions(WebSocketPayloadType);
    const payloadType: Ref<ISelectOption> = ref(payloadList[0]);
    const sports = EnumToSelectOptions(Sports);
    const sportId: Ref<ISelectOption> = ref(sports[0]);
    const inputRule = (feild: string) => [(val) => !!val || `${feild} is required`];
    const matchId = ref('');
    const payload: Ref<IPayload> = ref({ matchId: 0, tick: new Date().getTime().toString() });
    const json = ref('');
    const copyIcon = ref('content_copy');

    const payloadComponent = computed(() => {
      if (!payloadType.value) {
        return '';
      }
      payload.value = { matchId: 0, tick: new Date().getTime().toString() };
      json.value = '';
      switch (payloadType.value.value) {
        case WebSocketPayloadType.MatchStatusChange:
          return 'MatchStatus';
        case WebSocketPayloadType.MatchPeriodScoreChange:
          return 'MatchPeriodScore';
        case WebSocketPayloadType.MatchClockChange:
          return 'MatchClock';
        case WebSocketPayloadType.MarketLineChange:
          return 'MarketLine';
        default:
          return '';
      }
    });
    const displayJsonArea = computed(() => !!json.value);
    const onSubmit = () => {
      payload.value.matchId = +matchId.value;
      payload.value.tick = new Date().getTime().toString();
      payload.value.matchDate && (payload.value.matchDate = new Date(payload.value.matchDate).toISOString());
      json.value = JSON.stringify(payload.value, undefined, 2);
      const jsonArea = document.getElementById('jsonOutput');
      if (jsonArea) {
        jsonArea.innerHTML = json.value;
      }
    };
    const copyJson = () => {
      navigator.clipboard.writeText(json.value);
      copyIcon.value = 'check';
      setTimeout(() => {
        copyIcon.value = 'content_copy';
      }, 1000);
    };

    return {
      payloadType,
      payloadList,
      sports,
      sportId,
      inputRule,
      copyIcon,
      matchId,
      payloadComponent,
      displayJsonArea,
      payload,
      onSubmit,
      copyJson,
    };
  },
});
</script>

<style>
pre {
  outline: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
}
.string {
  color: green;
}
.number {
  color: darkorange;
}
.boolean {
  color: blue;
}
.null {
  color: magenta;
}
.key {
  color: red;
}
</style>
