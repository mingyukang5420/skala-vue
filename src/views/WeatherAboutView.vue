<script setup>
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <h3>ℹ️ 서비스 소개</h3>
      <p>
        본 대시보드는 SKALA Full-Stack Engineering Vue.js 과정의 "날씨" 실습 과제입니다.
        가상의 도시별 날씨 데이터를 검색하고, 도시를 선택해 상세 기상관측 정보(일출·일몰 포함)를
        확인할 수 있습니다.
      </p>
      <p>Composition API, 컴포넌트 분리, Vue Router 동적 라우팅까지 단계별로 적용한 실습 결과물입니다.</p>
    </BaseDashboardCard>

    <RouterLink class="back-link" :to="{ name: 'exercise-4-home' }">← 메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 600px;
  margin: 0 auto;
}
.back-link {
  display: inline-block;
  margin-top: 8px;
  color: #3498db;
  text-decoration: none;
}
.back-link:hover {
  text-decoration: underline;
}
</style>
