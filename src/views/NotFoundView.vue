<script setup></script>

<template>
  <div class="app-container">
    <h1>🤷 404 - 페이지를 찾을 수 없습니다</h1>
    <hr />
    <p>요청하신 경로가 존재하지 않습니다.</p>
    <RouterLink :to="{ name: 'exercise-1' }">날씨 메인으로 이동</RouterLink>
  </div>
</template>
