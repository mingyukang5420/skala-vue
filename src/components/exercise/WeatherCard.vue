<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import starOffIcon from '@/assets/icons/star-off.svg'
import starOnIcon from '@/assets/icons/star-on.svg'

const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()
const props = defineProps({ cityItem: { type: Object, required: true } })

const isFavorite = computed(() => favoriteStore.favoriteCityId === props.cityItem.id)

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <div class="weather-card" @click="emit('select-card', cityItem)">
    <h4>
      <button class="btn-favorite" @click.stop="favoriteStore.toggleFavorite(cityItem.id)">
        <img :src="isFavorite ? starOnIcon : starOffIcon" class="star-icon" alt="즐겨찾기" />
      </button>
      {{ cityItem.name }} ({{ cityItem.status }})
    </h4>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <span v-if="cityItem.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
    <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>

    <button class="btn-detail" @click.stop="emit('click-detail', cityItem.name, cityItem.status)">
      상세보기
    </button>
  </div>
</template>

<style scoped>
.weather-card {
  background: #fff;
  border: 1px solid #dee2e6;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
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
.cool {
  background-color: #74b9ff;
}
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
  padding: 6px 10px;
  cursor: pointer;
}
.btn-favorite {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 4px;
  vertical-align: middle;
}
.star-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
}
</style>
