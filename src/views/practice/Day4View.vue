<script setup lang="ts">
import StoreCounter from '@/components/practices/library/StoreCounter.vue'
import AxiosWeather from '@/components/practices/library/AxiosWeather.vue'
import AxiosJson from '@/components/practices/library/AxiosJson.vue'
import ElementRegisterForm from '@/components/practices/library/ElementRegisterForm.vue'
import ElementCommerceRate from '@/components/practices/library/ElementCommerceRate.vue'
import ElementFeedbackProgress from '@/components/practices/library/ElementFeedbackProgress.vue'
import ViteEnvDemo from '@/components/practices/library/ViteEnvDemo.vue'
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

    <h2>3. UI Libraries</h2>
    <hr />
    <ElementRegisterForm />
    <ElementCommerceRate />
    <ElementFeedbackProgress />

    <h2>4. Vite Build & Deployment</h2>
    <hr />
    <ViteEnvDemo />
  </div>
</template>
