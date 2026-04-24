<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "./components/Button/Button.vue";
import Display from "./components/Display/Display.vue";

const values = Array.from({ length: 10 }, (_, k) => `${k}`).sort(
  (a, b) => Number(a === "0") - Number(b === "0")
);

const LIMIT = 16;
const calculation = ref("");

const computedCalc = computed({
  get() {
    return calculation.value;
  },
  set(value) {
    if (calculation.value.length < LIMIT) {
      calculation.value = calculation.value.concat(value);
    }
  },
});
</script>

<template>
  <div class="flex flex-col items-center w-full h-full gap-4 p-4">
    <Display
      :calculation="computedCalc"
      class="w-full max-w-md h-12 sm:h-14 border border-slate-400 rounded-md p-2 text-right text-lg sm:text-xl"
    />
    <div class="grid grid-cols-3 gap-2 w-full max-w-md">
      <li
        v-for="value in values"
        :key="value"
        class="list-none justify-self-center"
      >
        <Button
          :label="value"
          :value="value"
          :onClick="(value) => (computedCalc = value)"
          class="flex w-fit h-fit select-none"
        />
      </li>
      <Button
        label="."
        value="."
        :onClick="(value) => (computedCalc = value)"
        class="flex w-fit h-fit justify-self-center select-none"
      />
      <Button
        label="="
        value="="
        :onClick="(value) => (computedCalc = value)"
        class="flex w-fit h-fit justify-self-center select-none"
      />
    </div>
  </div>
</template>
