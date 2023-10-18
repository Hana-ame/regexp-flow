<script setup lang="ts">
import Block from '@/components/Block.vue'
import { range, hasItem, saveItem, loadItem, getKeys, constructFlowData, constructPatternArray, removeItem, deconstructPattern } from '@/functions/helpers'

import { ref } from 'vue';
import { NInput, NButton } from 'naive-ui'


const inputText = ref("")

// blocks

const regexpArr = ref<string[]>([""])
const flagsArr = ref<string[][]>([['g','i']])
const replacePatternArr = ref<string[]>([""])
const outputTexts = ref<string[]>([""])

function addBlock(){
  regexpArr.value.push("")
  flagsArr.value.push(['g','i'])
  replacePatternArr.value.push("")
  outputTexts.value.push("")
}
function removeBlock(){
  regexpArr.value.pop()
  flagsArr.value.pop()
  replacePatternArr.value.pop()
  outputTexts.value.pop()
}

// keys

const keys = ref<string[]>(getKeys())
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

  saveKey(key)
  keys.value = getKeys()
  newKey.value = ""
}
function removeKey(key: string){
  removeItem(key)
  keys.value = getKeys()
}
function saveKey(key: string){
  console.log('save')
  const pattern = constructPatternArray(regexpArr.value, flagsArr.value, replacePatternArr.value)
  const flowData = constructFlowData(key, pattern)
  saveItem(key, flowData)
}
function loadKey(key: string){
  console.log(key)
  const dataFlow = loadItem(key)
  if (dataFlow === null) return
  [regexpArr.value, flagsArr.value, replacePatternArr.value] = deconstructPattern(dataFlow.patternArray)
}

</script>

<template>
  <span style="width:20%; display: list-item; text-align: left;">
    <div v-for="key in keys" :key="key">
      <n-button style="width:70%; justify-content:left" @click="loadKey(key)">{{ key }}</n-button>
      <n-button style="width:30%;" @click="removeKey(key)"> delete </n-button>
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
    <template v-for="i in range(outputTexts.length)" :key="i">
      <block
        :input-text="i==0 ? inputText : outputTexts[i-1]"
        v-model:outputText="outputTexts[i]"
        v-model:regexp="regexpArr[i]"
        v-model:flags="flagsArr[i]"
        v-model:replacePattern="replacePatternArr[i]"
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
