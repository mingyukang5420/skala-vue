<script setup>
import { ref } from 'vue'

const productQuantity = ref(1)
const productRate = ref(4)
</script>

<template>
  <div class="practice-section">
    <h2>⚡ 실습 2. 커머스 상품 수량 및 평점 시스템</h2>
    <el-card>
      <el-form label-position="top">
        <el-form-item label="구매 수량 선택:">
          <el-input-number v-model="productQuantity" :min="1" :max="10" />
          <span class="hint">(최대 10개 구매 가능)</span>
        </el-form-item>
        <el-form-item label="상품 만족도 별점:">
          <el-rate v-model="productRate" />
        </el-form-item>
      </el-form>
      <p class="summary">
        🟢 실시간 장부 요약: 선택 수량 {{ productQuantity }}개 / 내가 준 점수 {{ productRate }}점
      </p>
    </el-card>
  </div>
</template>

<style scoped>
.hint {
  margin-left: 10px;
  color: #7f8c8d;
  font-size: 13px;
}
.summary {
  margin-top: 12px;
  padding: 10px 14px;
  background: #f0fdf4;
  border-radius: 6px;
  color: #166534;
}
</style>
