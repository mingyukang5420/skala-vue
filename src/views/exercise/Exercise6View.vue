<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from '@/components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-container">
    <h1>⛅ 과제 6: Weather Axios</h1>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="weather-sub-nav">
        <RouterLink :to="{ name: 'exercise-6-home' }">🏠 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink :to="{ name: 'exercise-6-about' }">ℹ️ 소개</RouterLink>
        <UnitToggler />
      </nav>
      <main>
        <RouterView />
      </main>
    </div>
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
