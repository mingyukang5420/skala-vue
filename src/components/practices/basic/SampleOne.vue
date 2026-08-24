<script setup>
import { ref, onMounted } from 'vue'

// 1. 일반 변수 (화면이 실시간으로 바뀌지 않음)
let normalCount = 0

// 2. 반응성 변수 (화면이 실시간으로 바뀜)
const vueCount = ref(0)

// 3. 콘솔 로그용 스크립트
onMounted(() => {
  // DOM 그리고 이후에 querySelector로 버튼 찾기 위해서 onMounted 내부에 작성
  const allButtons = document.querySelectorAll('button')

  // 버튼 순회하면서 eventListener 추가
  allButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      console.log(event.target)
    })
  })
})
</script>

<template>
  <div class="practice-section">
    <h3>Hello Skala-Vue</h3>
    <h4>일반 변수 클릭: {{ normalCount }}</h4>
    <button @click="normalCount++">일반 변수 증가</button>
    <br />
    <h4>Vue 반응성 변수 클릭: {{ vueCount }}</h4>
    <button @click="vueCount++">Vue 변수 증가</button>
  </div>
</template>
