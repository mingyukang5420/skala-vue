import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', () => {
  // state: 즐겨찾기 도시는 딱 하나만 유지 (없으면 null)
  const favoriteCityId = ref(null)

  // getter: 즐겨찾기가 등록되어 있는지 여부
  const hasFavorite = computed(() => favoriteCityId.value !== null)

  // action: 같은 도시를 다시 누르면 해제, 다른 도시를 누르면 교체
  function toggleFavorite(cityId) {
    favoriteCityId.value = favoriteCityId.value === cityId ? null : cityId
  }

  return {
    favoriteCityId,
    hasFavorite,
    toggleFavorite,
  }
})
