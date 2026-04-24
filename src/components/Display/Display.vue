<script setup lang="ts">
import type { ClassValue } from "vue";
import { cn } from "../../lib/utils";

type Props = {
  calculation: string;
  class: ClassValue;
};

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn(props.class)">
    <span class="w-full text-end font-semibold text-sm sm:text-lg">{{
      props.calculation
    }}</span>
  </div>
</template>
