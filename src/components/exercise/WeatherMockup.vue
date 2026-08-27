<script setup>
import { ref } from 'vue'

// 1. [과제 요구사항] 4일차 API 연동을 대비한 가상의 백엔드 데이터 배열 (v-for 및 :key 실습용)
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

// 3,4. [과제 요구사항] 검색어 및 알림창 제어용 데이터 (v-model 대용 한글 처리 및 이벤트 실습용)
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 5. [추가기능] 엔터를 눌렀을 때 확정되는 검색어 (실제 필터링 기준)
const submittedQueries = ref([])
// 5. [추가기능] 검색을 한 번이라도 실행했는지 여부 (초기 빈 화면 제어용)
const hasSearched = ref(false)

// 5. [추가기능] 누적된 검색어들에 매칭되는 도시 목록 (handleSearch에서 계산해 대입)
const filteredList = ref([])

// 4. [과제 요구사항] 알림 대행 함수 (window 객체 격리 우회)
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

// 5. [추가기능] 누적된 검색어들에 매칭되는 도시를 모두 합치고, 중복은 id 기준으로 제거
function computeFilteredList() {
  if (submittedQueries.value.length === 0) return []

  const matched = weatherList.value.filter((item) =>
    submittedQueries.value.some((query) => item.name.includes(query)),
  )

  const uniqueMap = new Map()
  matched.forEach((item) => uniqueMap.set(item.id, item))
  return Array.from(uniqueMap.values())
}

// 5. [추가기능] 정규식으로 한글범위 검사 후 한글이 아니면 문자삭제
function filterKorean(e) {
  const onlyKorean = e.target.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, '')
  searchQuery.value = onlyKorean
  e.target.value = onlyKorean
}

// 5. [추가기능] 엔터 입력 시 검색 실행
function handleSearch() {
  const query = searchQuery.value.trim()
  if (!query) return
  // 이미 검색한 단어면 중복 추가하지 않음
  if (!submittedQueries.value.includes(query)) {
    submittedQueries.value.push(query)
  }
  filteredList.value = computeFilteredList()
  hasSearched.value = true
  searchQuery.value = '' // 검색 후 입력창 비우기
}

// 5. [추가기능] 검색 결과 초기화
function resetSearch() {
  submittedQueries.value = []
  filteredList.value = []
  hasSearched.value = false
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
        <!-- <input type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)" placeholder="검색할 도시 이름 입력" /> -->
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
      <h3>🏙 지역별 날씨 현황</h3>

      <p v-if="!hasSearched" class="empty-guide">
        도시 이름을 입력하고 Enter를 누르면 결과가 표시됩니다.
      </p>

      <p v-else-if="filteredList.length === 0" class="empty-guide">검색 결과가 없습니다.</p>

      <div
        v-else
        v-for="item in filteredList"
        :key="item.id"
        class="weather-card"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
        <p class="city-title">{{ item.name }} ({{ item.status }})</p>
        <p>현재 기온: {{ item.temp }}°C</p>

        <span v-if="item.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
        <span v-else class="badge cool">❄ 선선함 (25도 미만)</span>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
          상세보기
        </button>
      </div>
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

.empty-guide {
  color: #7f8c8d;
  font-size: 14px;
  padding: 8px 0;
}
</style>
