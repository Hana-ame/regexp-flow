<script setup lang="ts">

import Test from '@/components/Test.vue'
import { ref } from 'vue';

const a = ref("")

</script>

<template>

  <test
    v-model:a="a"
  ></test>

  <input
    v-model="a"
  />
 
</template>

<style>

  * {
    background-color: gray;
  }
</style>