<script setup>
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <div class="practice-section">
    <h3>v-once 디렉티브 학습</h3>
    <p>반응형 변수 (실시간): {{ count }}</p>
    <p v-once>v-once 변수 (최초 고정): {{ count }}</p>
    <button @click="count++">숫자 증가 버튼</button>
  </div>
</template>
