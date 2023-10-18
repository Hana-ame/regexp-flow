<script setup lang="ts">
import { computed } from 'vue';
import { NInput, NCheckboxGroup, NSpace, NCheckbox } from 'naive-ui'

// https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = defineProps<{
  inputText: string,
  outputText: string,
  regexp: string,
  flags: string[],
  replacePattern: string,
}>()

// https://vuejs.org/guide/components/events.html#events-validation
// https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits
const emit = defineEmits([
  'update:outputText',
  'update:regexp',
  'update:flags',
  'update:replacePattern',
])

/// const regExp  = ref("")
/// const flags = ref<string[]>(props.pattern[1].split(''))
// const flags = ref<string[]>(['i','g'])
// https://vuejs.org/guide/essentials/computed.html#computed-caching-vs-methods
// https://vuejs.org/guide/essentials/computed.html#writable-computed
// const flag = computed(() => {
//   return flags.value.join("")
// })
// const replacePattern = ref("")

const outputText = computed(() => {
  try {
    const reg = new RegExp(props.regexp, props.flags.join(""))
    const replaced = props.inputText.replace(reg, props.replacePattern)
    emit('update:outputText', replaced)
    return replaced  
  }catch (e) {
    console.log(e)
  }
})

/// function update() {
///   console.log('update', [regExp.value, flags.value.join(''), replacePattern.value])
///   emit('update:pattern', [regExp.value, flags.value.join(''), replacePattern.value])
/// }
/// watch([regExp, flag, replacePattern], update)

</script>

<template>
  <n-input
    placeholder="regExp" 
    :value="regexp"
    @update:value="(value) => $emit('update:regexp', value)"
    autosize 
    style="width: 100%" 
  />
  <n-checkbox-group 
    :value="flags"
    @update:value="(value) => $emit('update:flags', value)"
  >
    <n-space item-style="display: flex; background-color: white;">
      <n-checkbox value="g" label="g" />
      <n-checkbox value="i" label="i" />
    </n-space>
  </n-checkbox-group>
  <n-input 
    placeholder="replacePattern" 
    :value="replacePattern"
    @update:value="(value) => $emit('update:replacePattern', value)"
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
