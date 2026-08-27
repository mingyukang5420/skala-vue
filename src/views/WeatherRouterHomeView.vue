<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import SunriseSunsetCard from '@/components/exercise/SunriseSunsetCard.vue'
import WeatherMapSection from '@/components/exercise/WeatherMapSection.vue'
import { useConfigStore } from '@/stores/configStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { fetchCurrentWeather, fetchHolidays, formatUnixToLocalTime } from '@/services/weatherApi'

const router = useRouter()
const route = useRoute()
const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()

// 이 뷰는 과제4/과제5가 같이 쓰기 때문에, 상세 페이지 이동은 현재 라우트 기준으로 맞는 곳으로
const detailRouteName = computed(() => route.name?.replace('-home', '-detail'))

// 6일차 추가: 위경도만 고정 등록해두고, 실제 기온/날씨상태/일출·일몰은 OpenWeatherMap에서 받아온다
const weatherList = ref([
  { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.978, temp: null, status: '', sunrise: '', sunset: '' },
  { id: 'city_02', name: '수원', lat: 37.2636, lon: 127.0286, temp: null, status: '', sunrise: '', sunset: '' },
  { id: 'city_03', name: '부산', lat: 35.1796, lon: 129.0756, temp: null, status: '', sunrise: '', sunset: '' },
  { id: 'city_04', name: '성남', lat: 37.4201, lon: 127.1265, temp: null, status: '', sunrise: '', sunset: '' },
  { id: 'city_05', name: '제주', lat: 33.4996, lon: 126.5312, temp: null, status: '', sunrise: '', sunset: '' },
  { id: 'city_06', name: '울산', lat: 35.5384, lon: 129.3114, temp: null, status: '', sunrise: '', sunset: '' },
  { id: 'city_07', name: '대전', lat: 36.3504, lon: 127.3845, temp: null, status: '', sunrise: '', sunset: '' },
  { id: 'city_08', name: '대구', lat: 35.8714, lon: 128.6014, temp: null, status: '', sunrise: '', sunset: '' },
  { id: 'city_09', name: '광주', lat: 35.1595, lon: 126.8526, temp: null, status: '', sunrise: '', sunset: '' },
  { id: 'city_10', name: '인천', lat: 37.4563, lon: 126.7052, temp: null, status: '', sunrise: '', sunset: '' },
  { id: 'city_11', name: '세종', lat: 36.4801, lon: 127.289, temp: null, status: '', sunrise: '', sunset: '' },
])

const isLoadingWeather = ref(true)
const holidayList = ref([])
const isSimulatingHoliday = ref(false)

const todayIso = new Date().toISOString().slice(0, 10)

const todayHoliday = computed(() => holidayList.value.find((holiday) => holiday.date === todayIso) ?? null)

const nextHoliday = computed(
  () => holidayList.value.find((holiday) => holiday.date >= todayIso) ?? holidayList.value[0] ?? null,
)

// 6일차 추가: 실제로 오늘이 공휴일일 때만 배너가 뜨는데, 데모/캡쳐를 위해 실제 다음 공휴일 데이터로 "오늘이라고 가정"해보는 시뮬레이션 토글도 같이 둔다
const holidayMessage = computed(() => {
  if (todayHoliday.value) {
    return `📅 오늘은 공휴일(${todayHoliday.value.localName})입니다 — 매장 방문객 변동에 대비해 인력배치를 참고하세요.`
  }
  if (isSimulatingHoliday.value && nextHoliday.value) {
    return `📅 (시뮬레이션: '${nextHoliday.value.localName}'을 오늘이라고 가정) 매장 방문객 변동에 대비해 인력배치를 참고하세요.`
  }
  return ''
})

async function loadWeatherData() {
  isLoadingWeather.value = true
  await Promise.all(
    weatherList.value.map(async (city) => {
      try {
        const data = await fetchCurrentWeather(city.id, city.lat, city.lon)
        city.temp = data.main.temp
        city.status = data.weather[0].description
        city.sunrise = formatUnixToLocalTime(data.sys.sunrise, data.timezone)
        city.sunset = formatUnixToLocalTime(data.sys.sunset, data.timezone)
      } catch (error) {
        console.error(`🔴 [${city.name}] 날씨 데이터 로딩 실패:`, error)
      }
    }),
  )
  isLoadingWeather.value = false
}

async function loadHolidayBanner() {
  try {
    holidayList.value = await fetchHolidays(new Date().getFullYear())
  } catch (error) {
    console.error('🔴 공휴일 데이터 로딩 실패:', error)
  }
}

onMounted(() => {
  loadWeatherData()
  loadHolidayBanner()
})

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
      <h3>📅 공휴일 연동 안내 (B2B)</h3>
      <p v-if="holidayMessage" class="holiday-banner">{{ holidayMessage }}</p>
      <p v-else class="empty-guide">오늘은 공휴일이 아닙니다.</p>
      <button class="btn-simulate" @click="isSimulatingHoliday = !isSimulatingHoliday">
        {{ isSimulatingHoliday ? '시뮬레이션 끄기' : '🧪 공휴일 가정하기 (캡쳐용)' }}
      </button>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🗺️ 날씨 지도</h3>
      <WeatherMapSection :cities="weatherList" />
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

      <p v-if="isLoadingWeather" style="text-align: center; color: #3498db; padding: 10px 0">
        🔄 실시간 기상 데이터를 불러오는 중입니다...
      </p>

      <template v-else>
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
      </template>
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
.holiday-banner {
  margin: 0 0 8px;
  color: #b8860b;
  font-weight: bold;
  font-size: 14px;
}
.btn-simulate {
  padding: 6px 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
}
</style>
