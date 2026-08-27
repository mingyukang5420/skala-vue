<script setup>
// npm run format(Prettier) 실행 전에는 아래처럼 정렬/인덴트가 엉망이었다:
//   const     myRegion   = `Suwon` ;
//   const regionGreeting = `웰컴 투 ${myRegion}`;
// npm run format 실행 후 자동으로 정리된 결과:
const myRegion = `Suwon`
const regionGreeting = `웰컴 투 ${myRegion}`

// .env.staging / .env.production 중 현재 빌드 모드에 로드된 값을 그대로 출력
const apiUrl = import.meta.env.VITE_API_URL
console.log('현재 모드의 API URL:', apiUrl)
</script>

<template>
  <div class="practice-section">
    <h2>⚡ Prettier 포맷팅 + 환경변수(.env) 모드별 빌드</h2>
    <el-card>
      <p class="label">npm run format 실행 후 정리된 코드:</p>
      <pre class="code-block">const myRegion = `{{ myRegion }}`
const regionGreeting = `{{ regionGreeting }}`</pre>
      <p class="label">현재 모드의 import.meta.env.VITE_API_URL:</p>
      <p class="api-url">
        {{ apiUrl ?? '(비어있음 — dev 모드는 .env.staging/.env.production을 안 읽는다. 아래 빌드 명령으로 직접 확인)' }}
      </p>
      <p class="hint">
        <code>npm run build:staging</code>(vite build --mode staging)으로 빌드하면 위 값이
        <code>.env.staging</code>의 값으로, <code>npm run build</code>로 빌드하면
        <code>.env.production</code>의 값으로 바뀐다.
      </p>
    </el-card>
  </div>
</template>

<style scoped>
.label {
  font-weight: bold;
  margin-bottom: 6px;
}
.code-block {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  margin-bottom: 14px;
}
.api-url {
  color: #0284c7;
  font-weight: bold;
}
.hint {
  margin-top: 10px;
  font-size: 13px;
  color: #64748b;
}
</style>
