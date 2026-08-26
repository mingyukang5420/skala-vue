<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <h1>⛅ 과제 4: 날씨 (라우터)</h1>
    <hr />
    <nav class="weather-sub-nav">
      <RouterLink :to="{ name: 'exercise-4-home' }">🏠 대시보드</RouterLink>
      <span class="divider">|</span>
      <RouterLink :to="{ name: 'exercise-4-about' }">ℹ️ 소개</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.weather-sub-nav {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}
.weather-sub-nav .divider {
  color: #dcdde1;
}
.weather-sub-nav a {
  text-decoration: none;
  color: #7f8c8d;
  font-weight: bold;
}
.weather-sub-nav a.router-link-exact-active {
  color: #3498db;
}
</style>
