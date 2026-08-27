<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import SunriseSunsetCard from './SunriseSunsetCard.vue'

// 가상의 백엔드 데이터 배열 (일출/일몰 시간 필드 추가)
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

// computed를 활용한 검색 필터링 연산기 (누적된 확정 검색어 기준)
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

// watch를 활용한 선택 도시 추적 센서
watch(selectedCityInfo, (newInfo) => {
  console.log(`👁🗨 [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newInfo}"`)
})

// watchEffect를 활용한 자동 의존성 API 로그 시뮬레이션
watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})

// 클릭해서 선택한 도시 누적 목록(평균기온용) + 마지막으로 선택한 도시(일출/일몰용)
const selectedCities = ref([])
const selectedCity = ref(null)

function handleSelectCard(item) {
  selectedCityInfo.value = `${item.name}이 선택되었습니다.`
  selectedCity.value = item
  if (!selectedCities.value.some((city) => city.id === item.id)) {
    selectedCities.value.push(item)
  }
}

// 선택한 도시들의 평균 기온을 computed로 계산
const averageTemp = computed(() => {
  const list = selectedCities.value
  if (list.length === 0) return 0
  const sum = list.reduce((acc, item) => acc + item.temp, 0)
  return Math.round((sum / list.length) * 10) / 10
})

// 평균 기온이 28도 경계를 넘나드는 순간에만 반응하는 폭염 배너
const heatAlertMessage = ref('')

watch(averageTemp, (newAvg, oldAvg) => {
  const wasHot = oldAvg >= 28
  const isHot = newAvg >= 28
  if (isHot && !wasHot) {
    heatAlertMessage.value = `🌡 평균 기온이 ${newAvg}°C로 폭염 수준에 진입했습니다!`
    console.log(`🔥 [watch 감지] 평균 기온 폭염 진입: ${newAvg}°C`)
  } else if (!isHot && wasHot) {
    heatAlertMessage.value = ''
    console.log(`✅ [watch 감지] 평균 기온이 폭염 기준 아래로 내려갔습니다: ${newAvg}°C`)
  }
})

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

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
      <h3>🏙 지역별 날씨 현황</h3>

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
        @click-detail="showDetail"
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
</style>
