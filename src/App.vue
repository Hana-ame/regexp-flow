<script setup lang="ts">
import Block from './components/Block.vue'
import { range } from './functions/function'

import { ref } from 'vue';
import { NInput, NButton } from 'naive-ui'


const inputText = ref("")

const blockCnts = ref(1)
const patterns = ref<[string, string, string][]>([["","",""]])
const outputTexts = ref<string[]>([""])

// function click(){
//   console.log(outputTexts.value)
//   console.log(patterns.value)
// }

function addBlock(){
  blockCnts.value += 1
  patterns.value.push(["","",""])
  outputTexts.value.push("")
}
function removeBlock(){
  blockCnts.value -= 1
  patterns.value.pop()
  outputTexts.value.pop()
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
  <template v-for="i in range(blockCnts)" :key="i">
    <block
      :input-text="i==0 ? inputText : outputTexts[i-1]"
      v-model:outputText="outputTexts[i]"
      v-model:pattern="patterns[i]"
    ></block>
  </template>
  
  <n-button
    @click="addBlock"
  >
    add one block
  </n-button>
  <n-button
    @click="removeBlock"
  >
    remove last block
  </n-button>
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
