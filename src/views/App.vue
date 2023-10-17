<script setup lang="ts">
import Block from '@/components/Block.vue'
import { range, hasItem, saveItem, loadItem } from '@/functions/helpers'

import { nextTick, ref, watch } from 'vue';
import { NInput, NButton } from 'naive-ui'


const inputText = ref("")

// blocks

const blockCnts = ref(1)
const patterns = ref<[string, string, string][]>([["","",""]])
const outputTexts = ref<string[]>([""])

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
watch(patterns, () => {
  console.log(patterns.value)
})
// keys

const keys = ref<string[]>([])
const newKey = ref("")
const addKeyStr = ref("save")
function addKey(str: string){
  let key = newKey.value
  key = key.trim()
  if (key === "") return
  if (hasItem(key)) {
    if (str === "save") {
      addKeyStr.value = "overwrite?"
      setTimeout(() => {addKeyStr.value = "save"}, 1000)
      return
    }
    addKeyStr.value = "save"
  }
  if (addKeyStr.value == "overwrite?"){
    console.log(key)
  } else {
    keys.value.push(key)
  }  
  save(key)
  newKey.value = ""
}
function removeKey(index: number){
  console.log(index)
  keys.value.splice(index, 1)
}
function save(key: string){
  console.log('save')
  const n = blockCnts.value
  const patternArray = patterns.value
  saveItem(key, { n, patternArray })
}
function load(key: string){
  const { n, patternArray } = loadItem(key)
  console.log('load', n, patternArray)

  blockCnts.value = 0
  nextTick(() => {
    blockCnts.value = n
  })
  patterns.value = patternArray  
}

</script>

<template>
  <span style="width:20%; display: list-item; text-align: left;">
    <div v-for="key,index in keys" :key="key">
      <n-button style="width:70%; justify-content:left" @click="load(key)">{{ key }}</n-button>
      <n-button style="width:30%;" @click="removeKey(index)"> delete </n-button>
    </div>
    <div>
      <n-input 
        style="width:70%; justify-content:left"
        v-model:value="newKey"
      ></n-input>
      <n-button
        style="width:30%;"
        @click="addKey(addKeyStr)"
      > {{ addKeyStr }} </n-button>
    </div>
  </span>
  <span style="width:80%; display: list-item">
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
    <template v-for="i in range(patterns.length)" :key="i">
      <block
        :input-text="i==0 ? inputText : outputTexts[i-1]"
        v-model:outputText="outputTexts[i]"
        v-model:pattern="patterns[i]"
      ></block>
    </template>
    
    <n-button
      @click="console.log(patterns)"
    >
      test
    </n-button>

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
  </span>

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
