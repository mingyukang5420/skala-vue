<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import { useConfigStore } from '@/stores/configStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import starOffIcon from '@/assets/icons/star-off.svg'
import starOnIcon from '@/assets/icons/star-on.svg'

const route = useRoute()
const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()

// 이 뷰는 과제4/과제5가 같이 쓰기 때문에, 돌아가기 링크는 현재 라우트 기준으로 맞는 홈으로 이동
const homeRouteName = computed(() => route.name?.replace('-detail', '-home'))

// 4일차: 도시 코드에 해당하는 Mock Data (Router 동적 경로 매칭 실습용)
const weatherList = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', sunrise: '05:32', sunset: '19:47' },
  { id: 'city_02', name: '수원', temp: 24, status: '비', sunrise: '05:33', sunset: '19:48' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', sunrise: '05:25', sunset: '19:38' },
  { id: 'city_04', name: '성남', temp: 32, status: '맑음', sunrise: '05:32', sunset: '19:47' },
  { id: 'city_05', name: '제주', temp: 31, status: '비', sunrise: '05:38', sunset: '19:35' },
  { id: 'city_06', name: '울산', temp: 28, status: '구름', sunrise: '05:24', sunset: '19:37' },
  { id: 'city_07', name: '대전', temp: 25, status: '맑음', sunrise: '05:31', sunset: '19:44' },
  { id: 'city_08', name: '대구', temp: 29, status: '비', sunrise: '05:27', sunset: '19:40' },
  { id: 'city_09', name: '광주', temp: 23, status: '구름', sunrise: '05:33', sunset: '19:42' },
  { id: 'city_10', name: '인천', temp: 22, status: '맑음', sunrise: '05:34', sunset: '19:49' },
  { id: 'city_11', name: '세종', temp: 27, status: '비', sunrise: '05:31', sunset: '19:45' },
]

// Mount 시점에 route.params.cityId 기반으로 도시 객체 선택
const cityItem = computed(() => weatherList.find((item) => item.id === route.params.cityId) ?? null)

// 5일차: configStore 단위 설정에 맞춰 기온 변환
const displayTemp = computed(() => {
  const rawTemp = cityItem.value?.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const isFavorite = computed(() => favoriteStore.favoriteCityId === cityItem.value?.id)
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard v-if="!cityItem">
      <p class="empty-guide">🤔 존재하지 않는 도시 코드입니다: {{ route.params.cityId }}</p>
    </BaseDashboardCard>

    <BaseDashboardCard v-else>
      <h3>
        <button class="btn-favorite" @click.stop="favoriteStore.toggleFavorite(cityItem.id)">
          <img :src="isFavorite ? starOnIcon : starOffIcon" class="star-icon" alt="즐겨찾기" />
        </button>
        🏙️ {{ cityItem.name }} 상세 기상관측 정보
      </h3>
      <p>현재 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong></p>
      <p>날씨 상태: <strong>{{ cityItem.status }}</strong></p>
      <span v-if="cityItem.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
      <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>
      <p class="sun-line">🌅 일출: <strong>{{ cityItem.sunrise }}</strong></p>
      <p class="sun-line">🌇 일몰: <strong>{{ cityItem.sunset }}</strong></p>
    </BaseDashboardCard>

    <RouterLink class="back-link" :to="{ name: homeRouteName }">← 메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 600px;
  margin: 0 auto;
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 8px;
}
.hot {
  background-color: #ff7675;
}
.cool {
  background-color: #74b9ff;
}
.sun-line {
  font-size: 15px;
  margin: 6px 0;
}
.empty-guide {
  color: #7f8c8d;
  font-size: 14px;
  padding: 8px 0;
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
.btn-favorite {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 4px;
  vertical-align: middle;
}
.star-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
}
</style>
