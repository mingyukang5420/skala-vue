<script setup>
const content = '안녕하세요! <strong>Skala-Vue</strong> 강의입니다.'
</script>

<template>
  <div class="practice-section">
    <h3>v-text 디렉티브 학습</h3>
    <h4>1) 일반 보간법 {{}} 결과:</h4>
    <p>출력: {{ content }}</p>
    <br />

    <h4>2) v-text 디렉티브 결과:</h4>
    <p v-text="'출력: ' + content"></p>
    <br />

    <h4>3) v-html 결과 비교:</h4>
    <p v-html="content"></p>
  </div>
</template>
