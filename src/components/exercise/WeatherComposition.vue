<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

// 1. [1일차 데이터] 가상의 백엔드 데이터 배열
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '성남', temp: 32, status: '맑음' },
  { id: 'city_05', name: '제주', temp: 31, status: '비' },
  { id: 'city_06', name: '울산', temp: 28, status: '구름' },
  { id: 'city_07', name: '대전', temp: 25, status: '맑음' },
  { id: 'city_08', name: '대구', temp: 29, status: '비' },
  { id: 'city_09', name: '광주', temp: 23, status: '구름' },
  { id: 'city_10', name: '인천', temp: 22, status: '맑음' },
  { id: 'city_11', name: '세종', temp: 27, status: '비' },
])

// 2. [1일차 데이터] 검색어 및 알림창 제어용 데이터
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 2-1. [1일차 추가기능 이식] 엔터로 확정된 검색어 누적 목록
const submittedQueries = ref([])

// 3. [2일차 추가] computed를 활용한 검색 필터링 연산기 (누적된 확정 검색어 기준) (★핵심)
const filteredWeatherList = computed(() => {
  // 확정된 검색어가 하나도 없으면 원본 weatherList를 그대로 보여줍니다.
  if (submittedQueries.value.length === 0) {
    return weatherList.value
  }

  // 누적된 검색어들에 매칭되는 도시를 모두 합치고, 중복은 id 기준으로 제거합니다.
  const matched = weatherList.value.filter((item) =>
    submittedQueries.value.some((query) => item.name.includes(query)),
  )
  const uniqueMap = new Map()
  matched.forEach((item) => uniqueMap.set(item.id, item))
  return Array.from(uniqueMap.values())
})

// 4. [2일차 추가] watch를 활용한 선택 도시 추적 센서
// selectedCityInfo의 문구 변화를 감시하여 후속 로그를 처리합니다.
watch(selectedCityInfo, (newInfo) => {
  console.log(`👁️‍🗨️ [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newInfo}"`)
})

// 5. [2일차 추가] watchEffect를 활용한 자동 의존성 API 로그 시뮬레이션
// 타이핑할 때마다 변하는 searchQuery를 AI CCTV처럼 자동 추적합니다.
watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})

// 6. [추가기능] 클릭해서 선택한 도시 목록 (검색 결과와 달리 계속 누적됨)
const selectedCities = ref([])

function selectCity(item) {
  selectedCityInfo.value = `${item.name}이 선택되었습니다.`
  if (!selectedCities.value.some((city) => city.id === item.id)) {
    selectedCities.value.push(item)
  }
}

// 6. [추가기능] 선택한 도시들의 평균 기온을 computed로 계산 (검색 필터가 아닌 누적 선택 기준)
const averageTemp = computed(() => {
  const list = selectedCities.value
  if (list.length === 0) return 0
  const sum = list.reduce((acc, item) => acc + item.temp, 0)
  return Math.round((sum / list.length) * 10) / 10
})

// 7. [추가기능] 평균 기온이 28도 경계를 넘나드는 순간에만 반응하는 폭염 배너
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

// 알림 대행 함수
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

// 8. [1일차 추가기능 이식] 정규식으로 한글범위 검사 후 한글이 아니면 문자삭제
function filterKorean(e) {
  const onlyKorean = e.target.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, '')
  searchQuery.value = onlyKorean
  e.target.value = onlyKorean
}

// 9. [1일차 추가기능 이식] 엔터 입력(또는 버튼 클릭) 시 검색어 확정
function handleSearch() {
  const query = searchQuery.value.trim()
  if (!query) return
  if (!submittedQueries.value.includes(query)) {
    submittedQueries.value.push(query)
  }
  searchQuery.value = '' // 검색 후 입력창 비우기
}

// 10. [1일차 추가기능 이식] 확정된 검색어 초기화
function resetSearch() {
  submittedQueries.value = []
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="search-box">
      <h3>🔍 도시 검색</h3>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          @compositionend="filterKorean"
          @blur="filterKorean"
          @keyup.enter="handleSearch"
          placeholder="검색할 도시 이름 입력"
        />
        <button class="btn btn-search" @click="handleSearch">검색</button>
      </div>
      <p class="query-preview">
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
      <p v-if="submittedQueries.length > 0" class="query-history">
        누적 검색어: <strong>{{ submittedQueries.join(', ') }}</strong>
        <button class="btn-reset" @click="resetSearch">초기화</button>
      </p>
    </section>

    <section class="list-box">
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

      <div
        v-for="item in filteredWeatherList"
        :key="item.id"
        class="weather-card"
        @click="selectCity(item)"
      >
        <h4>{{ item.name }} ({{ item.status }})</h4>
        <p>현재 기온: {{ item.temp }}°C</p>

        <span v-if="item.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
        <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
          상세보기
        </button>
      </div>

      <p
        v-if="filteredWeatherList.length === 0"
        style="text-align: center; color: #e74c3c; padding: 10px 0"
      >
        😭 검색 결과와 일치하는 도시가 없습니다.
      </p>
    </section>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
/* 입력창 + 검색 버튼을 한 줄에 배치 */
.input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* 기존 input 스타일(width: 90%)이 flex 안에서 남는 공간을 채우도록 재정의 */
.input-group input {
  flex: 1 1 auto;
  width: auto;
}

.btn-search {
  padding: 8px 14px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-search:hover {
  background-color: #2980b9;
}

.btn-reset {
  margin-left: 8px;
  padding: 4px 10px;
  font-size: 12px;
  color: #7f8c8d;
  background-color: transparent;
  border: 1px solid #dcdde1;
  border-radius: 4px;
  cursor: pointer;
}

.btn-reset:hover {
  color: #2c3e50;
  border-color: #2c3e50;
}

.query-history {
  margin-top: 8px;
  font-size: 14px;
}
</style>
