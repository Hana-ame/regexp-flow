<script setup lang="ts">
import TestInput from './TestInput.vue';

import { ref, computed } from 'vue';
import { NInput, NCheckboxGroup, NSpace, NCheckbox } from 'naive-ui'

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