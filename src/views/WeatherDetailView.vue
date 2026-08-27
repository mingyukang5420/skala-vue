<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import { useConfigStore } from '@/stores/configStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import starOffIcon from '@/assets/icons/star-off.svg'
import starOnIcon from '@/assets/icons/star-on.svg'
import { fetchCurrentWeather, formatUnixToLocalTime, mapWeatherStatus } from '@/services/weatherApi'

const route = useRoute()
const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()

// 이 뷰는 과제4/과제5/과제6이 같이 쓰기 때문에, 돌아가기 링크는 현재 라우트 기준으로 맞는 홈으로 이동
const homeRouteName = computed(() => route.name?.replace('-detail', '-home'))

// 6일차: 위경도 레지스트리 (OpenWeatherMap 호출용, WeatherRouterHomeView와 동일 좌표 유지)
const cityRegistry = {
  city_01: { name: '서울', lat: 37.5665, lon: 126.978 },
  city_02: { name: '수원', lat: 37.2636, lon: 127.0286 },
  city_03: { name: '부산', lat: 35.1796, lon: 129.0756 },
  city_04: { name: '성남', lat: 37.4201, lon: 127.1265 },
  city_05: { name: '제주', lat: 33.4996, lon: 126.5312 },
  city_06: { name: '울산', lat: 35.5384, lon: 129.3114 },
  city_07: { name: '대전', lat: 36.3504, lon: 127.3845 },
  city_08: { name: '대구', lat: 35.8714, lon: 128.6014 },
  city_09: { name: '광주', lat: 35.1595, lon: 126.8526 },
  city_10: { name: '인천', lat: 37.4563, lon: 126.7052 },
  city_11: { name: '세종', lat: 36.4801, lon: 127.289 },
}

const cityItem = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  const id = route.params.cityId
  const target = cityRegistry[id]
  if (!target) {
    isLoading.value = false
    return
  }

  try {
    const data = await fetchCurrentWeather(id, target.lat, target.lon)
    cityItem.value = {
      id,
      name: target.name,
      temp: data.main.temp,
      status: mapWeatherStatus(data.weather[0].main),
      sunrise: formatUnixToLocalTime(data.sys.sunrise, data.timezone),
      sunset: formatUnixToLocalTime(data.sys.sunset, data.timezone),
    }
  } catch (error) {
    console.error(`🔴 [${target.name}] 상세 날씨 데이터 로딩 실패:`, error)
  } finally {
    isLoading.value = false
  }
})

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
    <BaseDashboardCard v-if="isLoading">
      <p class="empty-guide">🔄 실시간 기상 데이터를 불러오는 중입니다...</p>
    </BaseDashboardCard>

    <BaseDashboardCard v-else-if="!cityItem">
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
