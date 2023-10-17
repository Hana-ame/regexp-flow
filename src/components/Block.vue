<script setup lang="ts">
import { ref, computed } from 'vue';
import { NInput, NCheckboxGroup, NSpace, NCheckbox } from 'naive-ui'

// https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = defineProps<{
  inputText: string,
  outputText: string,
  pattern: [string, string, string],
}>()

// https://vuejs.org/guide/components/events.html#events-validation
// https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits
const emit = defineEmits([
  'update:outputText',
  'update:pattern',
])

// const regExp  = ref("")
// const flags = ref<string[]>(props.pattern[1].split(''))
const flags = ref<string[]>(['i','g'])
// https://vuejs.org/guide/essentials/computed.html#computed-caching-vs-methods
// https://vuejs.org/guide/essentials/computed.html#writable-computed
const flag = computed(() => {
  return flags.value.join("")
})
// const replacePattern = ref("")

const outputText = computed(() => {
  const reg = new RegExp(props.pattern[0], flag.value)
  const replaced = props.inputText.replace(reg, props.pattern[2])
  const pattern: [string, string, string] = [props.pattern[0], flag.value, props.pattern[2]]
  console.log("replaced, pattern: ", replaced, pattern)
  // nextTick(()=>{    
    emit('update:outputText', replaced)
    emit('update:pattern', pattern)
  // })
  return replaced  
})

// function update() {
//   console.log('update', [regExp.value, flags.value.join(''), replacePattern.value])
//   emit('update:pattern', [regExp.value, flags.value.join(''), replacePattern.value])
// }
// watch([regExp, flag, replacePattern], update)

</script>

<template>
  <n-input
    placeholder="regExp" 
    v-model:value="pattern[0]"
    autosize 
    style="width: 100%" 
  />
  <n-checkbox-group v-model:value="flags">
    <n-space item-style="display: flex; background-color: white;">
      <n-checkbox value="g" label="g" />
      <n-checkbox value="i" label="i" />
    </n-space>
  </n-checkbox-group>
  <n-input 
    placeholder="replacePattern" 
    v-model:value="pattern[2]"
    autosize 
    style="width: 100%"
  />
  <n-input
    style="width: 100%" 
    v-model:value="outputText"
    type="textarea"
    placeholder="outputText"
    :autosize="{
      minRows: 3,
      maxRows: 50,
    }"
  />

</template>

<style>
</style>
