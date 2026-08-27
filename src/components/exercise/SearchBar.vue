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
      <el-input
        :model-value="currentQuery"
        placeholder="검색할 도시 이름 입력"
        @input="(val) => emit('update-query', val)"
        @compositionend="filterKorean"
        @blur="filterKorean"
        @keyup.enter="emit('submit-query')"
      >
        <template #prefix>🔍</template>
      </el-input>
      <el-button class="btn-search" type="primary" @click="emit('submit-query')">검색</el-button>
    </div>
    <p class="query-preview">
      검색 중인 도시: <strong>{{ currentQuery }}</strong>
    </p>
    <p v-if="submittedQueries.length > 0" class="query-history">
      누적 검색어: <strong>{{ submittedQueries.join(', ') }}</strong>
      <el-button class="btn-reset" size="small" text @click="emit('reset-query')">초기화</el-button>
    </p>
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn-search {
  white-space: nowrap;
}

.btn-reset {
  margin-left: 8px;
}

.query-history {
  margin-top: 8px;
  font-size: 14px;
}
</style>
