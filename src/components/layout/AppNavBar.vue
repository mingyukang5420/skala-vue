<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navigation-bar">
    <RouterLink class="nav-item" :to="{ name: 'exercise-1' }">과제1</RouterLink>
    <span class="divider">|</span>
    <RouterLink class="nav-item" :to="{ name: 'exercise-2' }">과제2</RouterLink>
    <span class="divider">|</span>
    <RouterLink class="nav-item" :to="{ name: 'exercise-3' }">과제3</RouterLink>
    <span class="divider">|</span>
    <RouterLink class="nav-item" :to="{ name: 'exercise-4' }">과제4</RouterLink>
    <span class="divider">|</span>
    <RouterLink class="nav-item" :to="{ name: 'exercise-5' }">과제5</RouterLink>
    <span class="divider">|</span>
    <RouterLink class="nav-item" :to="{ name: 'exercise-6' }">과제6</RouterLink>
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
