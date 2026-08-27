<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import SunriseSunsetCard from '@/components/exercise/SunriseSunsetCard.vue'
import { useConfigStore } from '@/stores/configStore'
import { useFavoriteStore } from '@/stores/favoriteStore'

const router = useRouter()
const route = useRoute()
const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()

// 이 뷰는 과제4/과제5가 같이 쓰기 때문에, 상세 페이지 이동은 현재 라우트 기준으로 맞는 곳으로
const detailRouteName = computed(() => route.name?.replace('-home', '-detail'))

// 가상의 백엔드 데이터 배열 (WeatherDetailView와 동일한 도시 목록/필드 유지)
const weatherList = ref([
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
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const submittedQueries = ref([])

const filteredWeatherList = computed(() => {
  if (submittedQueries.value.length === 0) {
    return weatherList.value
  }
  const matched = weatherList.value.filter((item) =>
    submittedQueries.value.some((query) => item.name.includes(query)),
  )
  const uniqueMap = new Map()
  matched.forEach((item) => uniqueMap.set(item.id, item))
  return Array.from(uniqueMap.values())
})

watch(selectedCityInfo, (newInfo) => {
  console.log(`👁️‍🗨️ [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newInfo}"`)
})

watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})

const selectedCities = ref([])
const selectedCity = ref(null)

function handleSelectCard(item) {
  selectedCityInfo.value = `${item.name}이 선택되었습니다.`
  selectedCity.value = item
  if (!selectedCities.value.some((city) => city.id === item.id)) {
    selectedCities.value.push(item)
  }
}

const averageTemp = computed(() => {
  const list = selectedCities.value
  if (list.length === 0) return 0
  const sum = list.reduce((acc, item) => acc + item.temp, 0)
  return Math.round((sum / list.length) * 10) / 10
})

const heatAlertMessage = ref('')

watch(averageTemp, (newAvg, oldAvg) => {
  const wasHot = oldAvg >= 28
  const isHot = newAvg >= 28
  if (isHot && !wasHot) {
    heatAlertMessage.value = `🌡️ 평균 기온이 ${newAvg}°C로 폭염 수준에 진입했습니다!`
    console.log(`🔥 [watch 감지] 평균 기온 폭염 진입: ${newAvg}°C`)
  } else if (!isHot && wasHot) {
    heatAlertMessage.value = ''
    console.log(`✅ [watch 감지] 평균 기온이 폭염 기준 아래로 내려갔습니다: ${newAvg}°C`)
  }
})

// 4일차 추가: 상세보기 클릭 시 window.alert 대신 Programmatic Navigation으로 상세 페이지 이동
function handleClickDetail(item) {
  router.push({ name: detailRouteName.value, params: { cityId: item.id } })
}

// 5일차 추가: 즐겨찾기한 도시 (항상 상단에 고정 표시, 단위 변환도 적용)
const favoriteCity = computed(() =>
  weatherList.value.find((item) => item.id === favoriteStore.favoriteCityId),
)

const favoriteDisplayTemp = computed(() => {
  if (!favoriteCity.value) return null
  const rawTemp = favoriteCity.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

function handleSearch() {
  const query = searchQuery.value.trim()
  if (!query) return
  if (!submittedQueries.value.includes(query)) {
    submittedQueries.value.push(query)
  }
  searchQuery.value = ''
}

function resetSearch() {
  submittedQueries.value = []
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <h3>⭐ 즐겨찾기 도시</h3>
      <p v-if="favoriteCity" class="favorite-line">
        {{ favoriteCity.name }} ({{ favoriteCity.status }}) —
        <strong>{{ favoriteDisplayTemp }}{{ configStore.unitSymbol }}</strong>
      </p>
      <p v-else class="favorite-line empty-guide">
        즐겨찾기한 도시가 없습니다. 목록에서 별 아이콘을 눌러 등록해 보세요.
      </p>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <SearchBar
        :current-query="searchQuery"
        :submitted-queries="submittedQueries"
        @update-query="(val) => (searchQuery = val)"
        @submit-query="handleSearch"
        @reset-query="resetSearch"
      />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🌅 일출 · 일몰 시간</h3>
      <SunriseSunsetCard :city-item="selectedCity" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황</h3>

      <p class="avg-temp-line">
        📊 선택한 도시 평균 기온: <strong>{{ averageTemp }}°C</strong>
        <span v-if="selectedCities.length > 0">({{ selectedCities.length }}개 도시 선택됨)</span>
      </p>
      <p
        v-if="heatAlertMessage"
        class="badge hot"
        style="display: inline-block; margin-bottom: 10px"
      >
        {{ heatAlertMessage }}
      </p>

      <WeatherCard
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city-item="item"
        @select-card="handleSelectCard"
        @click-detail="() => handleClickDetail(item)"
      />

      <p
        v-if="filteredWeatherList.length === 0"
        style="text-align: center; color: #e74c3c; padding: 10px 0"
      >
        😭 검색 결과와 일치하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
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
}
.hot {
  background-color: #ff7675;
}
.status-bar {
  background: #e8f5e9;
  padding: 10px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  border-radius: 6px;
}
.empty-guide {
  color: #7f8c8d;
}
.favorite-line {
  min-height: 2.6em;
  margin: 0;
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>
