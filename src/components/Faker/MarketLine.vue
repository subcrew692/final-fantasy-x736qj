<template>
  <q-toggle v-model="theModel.isFavorite" label="IsFavorite" left-label />
  <q-input color="teal" outlined v-model.number="theModel.marketLineNo" label="MarketLineNo" :rules="rule('MarketLineNo')" clearable />
  <q-select outlined v-model="theModel.marketLineStatus" :options="marketLineStatusList" label="MarketLineStatus" emit-value map-options></q-select>
  <q-btn color="secondary" icon="add" label="Selection" @click="addSelection" />
  <div v-for="(s, index) in theModel.selections" :key="index">
    <div class="row">
      <div class="col-10">
        <q-toggle v-model="theModel.selections[index].isActive" label="IsActive" left-label />
      </div>
      <div class="col-2" style="text-align: right">
        <q-btn flat round dense icon="clear" @click="removeSelection(index)" />
      </div>
    </div>
    <q-input
      color="teal"
      outlined
      v-model.number="theModel.selections[index].selectionNo"
      label="SelectionNo"
      :rules="rule('SelectionNo')"
      clearable
    />
    <q-input color="teal" outlined v-model.number="theModel.selections[index].handicap" label="Handicap" clearable />
    <q-input color="teal" outlined v-model.number="theModel.selections[index].odds" label="Odds" :rules="rule('Odds')" clearable />
  </div>
</template>
<script lang="ts">
import { EnumToSelectOptions, MarketLineStatus } from '@/models/enum';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'MarketLine',
  props: {
    sportId: { type: Number, required: true },
    rule: { type: Function, required: true },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const marketLineStatusList = EnumToSelectOptions(MarketLineStatus);
    const theModel = computed(() => props.modelValue);
    theModel.value.marketLineStatus = MarketLineStatus.Open;
    theModel.value.isFavorite = false;
    theModel.value.selections = [];
    const addSelection = () => theModel.value.selections.push({ isActive: true, handicap: null });
    const removeSelection = (index: number) => theModel.value.selections.splice(index, 1);
    return { marketLineStatusList, theModel, addSelection, removeSelection };
  },
});
</script>
