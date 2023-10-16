<script setup lang="ts">
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

  <n-input
    @update-value="$emit('upadate:a', $event.toString())"
  ></n-input>

</template>