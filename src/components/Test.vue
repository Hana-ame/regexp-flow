<script setup lang="ts">
import TestInput from './TestInput.vue';

const props = defineProps<{
  a : string,
}>();

const emits = defineEmits([
  'upadate:a'
])
</script>

<template>
  <div>
    {{ props.a }}
  </div>

  <input v-model="props.a" type="text" />

  <test-input
    :a="props.a"
  ></test-input>

</template>