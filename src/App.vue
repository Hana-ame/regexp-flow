<script setup lang="ts">
import Block from './components/Block.vue'


import { ref, computed } from 'vue';
// import { NInput, NCheckboxGroup, NSpace, NCheckbox, NButton } from 'naive-ui'
import { NInput, NButton } from 'naive-ui'

const inputText = ref("")

// const regExp  = ref("")
// const flags = ref<string[]>([])
// const flag = computed(() => {
//   return flags.value.join("")
// })
// const replacePattern = ref("")

// const outputText = computed(() => {
//   const reg = new RegExp(regExp.value, flag.value)
//   const replaced = inputText.value.replace(reg, replacePattern.value)
//   console.log(reg)
//   return replaced  
// })

const pattern = ref<[string, string, string]>(["", "", ""])
const outputText = ref("")

function click(){
  console.log(outputText.value)
  console.log(pattern.value)
}
</script>

<template>
  <n-input
    style="width: 100%" 
    v-model:value="inputText"
    type="textarea"
    placeholder="inputText"
    :autosize="{
      minRows: 3,
      maxRows: 50,
    }"
  />
  <n-button
    @click="click"
  >
    click
  </n-button>

  <block
    :input-text="inputText"
    v-model:outputText="outputText"
    v-model:pattern="pattern"
  ></block>
</template>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
