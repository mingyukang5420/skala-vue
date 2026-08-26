<script setup>
defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
  submittedQueries: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update-query', 'submit-query', 'reset-query'])

// 정규식으로 한글범위 검사 후 한글이 아니면 문자삭제, 정제된 값만 부모로 emit
function filterKorean(e) {
  const onlyKorean = e.target.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, '')
  e.target.value = onlyKorean
  emit('update-query', onlyKorean)
}
</script>

<template>
  <div class="search-inner">
    <h3>🔍 도시 검색</h3>
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        :value="currentQuery"
        @input="emit('update-query', $event.target.value)"
        @compositionend="filterKorean"
        @blur="filterKorean"
        @keyup.enter="emit('submit-query')"
        placeholder="검색할 도시 이름 입력"
      />
      <button class="btn-search" @click="emit('submit-query')">검색</button>
    </div>
    <p class="query-preview">
      검색 중인 도시: <strong>{{ currentQuery }}</strong>
    </p>
    <p v-if="submittedQueries.length > 0" class="query-history">
      누적 검색어: <strong>{{ submittedQueries.join(', ') }}</strong>
      <button class="btn-reset" @click="emit('reset-query')">초기화</button>
    </p>
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

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
