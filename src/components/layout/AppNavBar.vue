<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navigation-bar">
    <RouterLink class="nav-item" :to="{ name: 'weather-home' }">🌦️ 날씨</RouterLink>
    <span class="divider">|</span>
    <RouterLink class="nav-item" :to="{ name: 'practice-day1' }">Day 1</RouterLink>
    <span class="divider">|</span>
    <RouterLink class="nav-item" :to="{ name: 'practice-day2' }">Day 2</RouterLink>
    <span class="divider">|</span>
    <RouterLink class="nav-item" :to="{ name: 'practice-day3' }">Day 3</RouterLink>
    <span class="divider">|</span>
    <RouterLink class="nav-item" :to="{ name: 'practice-day4' }">Day 4</RouterLink>
  </nav>
</template>
