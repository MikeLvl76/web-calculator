<script setup lang="ts">
import type { ClassValue } from "vue";
import { cn } from "../../lib/utils";

type Props = {
  label: string;
  value: string;
  onClick: (value: string) => void;
  class?: ClassValue;
};

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn(props.class)">
    <button
      @click="props.onClick(props.value)"
      class="w-12 h-12 sm:w-18 sm:h-18 p-1 my-auto rounded-sm text-md sm:text-xl bg-slate-300 text-slate-900 hover:cursor-pointer hover:bg-slate-500 font-semibold"
    >
      {{ props.label }}
    </button>
  </div>
</template>
