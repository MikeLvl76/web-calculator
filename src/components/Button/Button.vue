<script setup lang="ts">
type Props = {
  label: string;
  value: string;
  onClick: (value: string) => void;
};

const props = defineProps<Props>();
</script>

<template>
  <div class="flex w-fit h-fit">
    <button
      @click="props.onClick(props.value)"
      class="w-12 h-12 sm:w-18 sm:h-18 p-1 my-auto rounded-sm text-md sm:text-xl bg-slate-100 text-slate-900 hover:cursor-pointer hover:bg-slate-300 font-semibold"
    >
      {{ props.label }}
    </button>
  </div>
</template>
