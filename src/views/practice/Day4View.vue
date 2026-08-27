<script setup lang="ts">
import StoreCounter from '@/components/practices/library/StoreCounter.vue'
import AxiosWeather from '@/components/practices/library/AxiosWeather.vue'
import AxiosJson from '@/components/practices/library/AxiosJson.vue'
</script>

<template>
  <div class="practice-container">
    <h1>Day 4 - Store 실습</h1>
    <h2>1. Store</h2>
    <hr />
    <StoreCounter />

    <h2>2. Axios</h2>
    <hr />
    <AxiosWeather />
    <AxiosJson />
  </div>
</template>
