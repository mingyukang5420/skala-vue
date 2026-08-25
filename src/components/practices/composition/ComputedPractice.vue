<script setup>
import { ref, computed } from 'vue'

const cartItems = ref([
  { id: 1, name: '노트북', price: 1200000, qty: 1 },
  { id: 2, name: '마우스', price: 25000, qty: 2 },
  { id: 3, name: '키보드', price: 89000, qty: 1 },
])

// computed: 의존하는 값(cartItems)이 바뀔 때만 재계산되고, 그 외에는 캐시된 값을 반환
const totalPrice = computed(() => {
  console.log('totalPrice computed 재계산됨')
  return cartItems.value.reduce((sum, item) => sum + item.price * item.qty, 0)
})

const totalCount = computed(() => cartItems.value.reduce((sum, item) => sum + item.qty, 0))

// 일반 함수: 호출할 때마다 매번 새로 계산 (캐시 없음, 비교용)
function totalPriceByMethod() {
  console.log('totalPriceByMethod 메소드 호출됨')
  return cartItems.value.reduce((sum, item) => sum + item.price * item.qty, 0)
}

function increaseQty(item) {
  item.qty++
}
</script>

<template>
  <div class="practice-section">
    <h3>computed 기본 - 장바구니 합계</h3>
    <h4>1) 상품 목록</h4>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.name }} - {{ item.price.toLocaleString() }}원 x {{ item.qty }}개
        <button @click="increaseQty(item)">수량 +1</button>
      </li>
    </ul>

    <h4>2) computed vs 메소드 호출 비교</h4>
    <p>computed 합계: <strong>{{ totalPrice.toLocaleString() }}원</strong> (총 {{ totalCount }}개)</p>
    <p>메소드 합계: <strong>{{ totalPriceByMethod().toLocaleString() }}원</strong></p>
    <p>
      콘솔을 열고 "수량 +1" 버튼을 눌러보면, computed는 값이 실제로 바뀔 때만 재계산 로그가
      찍히지만 메소드는 화면이 리렌더링될 때마다 매번 로그가 찍히는 차이를 확인할 수 있습니다.
    </p>
  </div>
</template>
