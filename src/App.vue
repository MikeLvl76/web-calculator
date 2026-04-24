<script setup lang="ts">
import Button from "./components/Button/Button.vue";
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h1>Web Calculator</h1>
    <Button label="0" :value="'0'" :onClick="(value) => console.log(value)" />
  </div>
</template>
