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
    <!-- exercise-6는 children(home/about/detail)을 가진 부모 라우트라, 부모 이름으로 이동하면
         Vue Router가 기본 자식(exercise-6-home)을 matched에 안 넣어서 대시보드 탭이 active로 안 잡힘.
         진입하자마자 대시보드가 active로 보이는 게 UX상 맞다고 판단해서 자식 라우트 이름으로 직접 연결함. -->
    <RouterLink class="nav-item" :to="{ name: 'exercise-6-home' }">과제4-7</RouterLink>
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
