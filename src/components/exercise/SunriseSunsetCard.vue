<script setup>
defineProps({
  cityItem: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="sunrise-sunset-card">
    <template v-if="cityItem">
      <p class="sun-line">
        🌅 일출: <strong>{{ cityItem.sunrise }}</strong>
      </p>
      <p class="sun-line">
        🌇 일몰: <strong>{{ cityItem.sunset }}</strong>
      </p>
    </template>
    <p v-else class="empty-guide">도시를 선택하면 일출·일몰 시간이 표시됩니다. ☀</p>
  </div>
</template>

<style scoped>
.sun-line {
  font-size: 15px;
  margin: 6px 0;
}
.empty-guide {
  color: #7f8c8d;
  font-size: 14px;
  padding: 8px 0;
}
</style>
