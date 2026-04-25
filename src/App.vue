<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "./components/Button/Button.vue";
import Display from "./components/Display/Display.vue";
import { Tokenizer } from "./servcies/tokenizer";
import { PostfixNotation } from "./servcies/postfix-notation";

const values = Array.from({ length: 10 }, (_, k) => `${k}`).sort(
  (a, b) => Number(a === "0") - Number(b === "0")
);

const operators = ["+", "-", "x", "/"];

const LIMIT = 32;
const expression = ref("");

const computedExpr = computed({
  get() {
    return expression.value;
  },
  set(value: string) {
    if (
      expression.value.length < LIMIT ||
      value.length < expression.value.length
    ) {
      expression.value = value;
    }
  },
});

const calculate = () => {
  const tokens = Tokenizer.tokenize(expression.value);
  const output = PostfixNotation.create(tokens);
  expression.value = PostfixNotation.evaluate(output);
};
</script>

<template>
  <div class="flex flex-col items-center w-full h-full gap-4 p-4">
    <Display
      :calculation="computedExpr"
      class="w-full max-w-md h-12 sm:h-14 border border-slate-400 rounded-md p-2 text-right text-lg sm:text-xl"
    />
    <div class="grid grid-cols-5 gap-2 w-full max-w-md">
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <Button
          v-for="value in values"
          :key="value"
          :label="value"
          :value="value"
          :onClick="
            (value) => (computedExpr = [...computedExpr, value].join(''))
          "
          class="flex w-fit h-fit justify-self-center select-none"
        />
        <Button
          label="."
          value="."
          :onClick="
            (value) => (computedExpr = [...computedExpr, value].join(''))
          "
          class="flex w-fit h-fit justify-self-center select-none"
        />
        <Button
          label="="
          value="="
          :onClick="(_) => calculate()"
          class="flex w-fit h-fit justify-self-center select-none"
        />
      </div>
      <div class="flex flex-col gap-2">
        <Button
          v-for="op in operators"
          :key="op"
          :label="op"
          :value="op"
          :onClick="
            (value) => (computedExpr = [...computedExpr, value].join(''))
          "
          class="flex w-fit h-fit select-none justify-self-center"
        />
      </div>
      <div class="flex flex-col gap-2">
        <Button
          label="("
          value="("
          :onClick="
            (value) => (computedExpr = [...computedExpr, value].join(''))
          "
          class="flex w-fit h-fit justify-self-center select-none"
        />
        <Button
          label=")"
          value=")"
          :onClick="
            (value) => (computedExpr = [...computedExpr, value].join(''))
          "
          class="flex w-fit h-fit justify-self-center select-none"
        />
        <Button
          label="DEL"
          value="\0"
          :onClick="(_) => (computedExpr = computedExpr.slice(0, -1))"
          class="flex w-fit h-fit justify-self-center select-none"
        />
        <Button
          label="C"
          value="\0"
          :onClick="(_) => (computedExpr = '')"
          class="flex w-fit h-fit justify-self-center select-none"
        />
      </div>
    </div>
  </div>
</template>
