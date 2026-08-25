<script setup>
import { reactive, toRefs } from 'vue'

// reactive: 객체 전체를 반응형으로 감쌈
const profile = reactive({
  name: '홍길동',
  level: 1,
  exp: 0,
})

function gainExp() {
  profile.exp += 10
  if (profile.exp >= 50) {
    profile.exp = 0
    profile.level++
  }
}

// 구조분해 시 반응성이 끊기는 문제를 toRefs로 해결
const { name, level, exp } = toRefs(profile)

// 비교용: toRefs 없이 구조분해하면 아래 값은 최초 1회만 값이 복사되고 이후 업데이트를 반영하지 못함
const { exp: expWithoutToRefs } = profile
</script>

<template>
  <div class="practice-section">
    <h3>reactive 기본 - 캐릭터 상태</h3>
    <h4>1) reactive 객체 직접 접근</h4>
    <p>{{ profile.name }} (Lv.{{ profile.level }}) - 경험치 {{ profile.exp }}/50</p>
    <button @click="gainExp">경험치 획득 +10</button>

    <h4>2) toRefs로 구조분해해도 반응성 유지</h4>
    <p>이름: {{ name }} / 레벨: {{ level }} / 경험치: {{ exp }}</p>

    <h4>3) toRefs 없이 구조분해하면 반응성이 끊김 (고정값)</h4>
    <p>구조분해 시점의 경험치 스냅샷: {{ expWithoutToRefs }} (버튼을 눌러도 값이 바뀌지 않습니다)</p>
  </div>
</template>
