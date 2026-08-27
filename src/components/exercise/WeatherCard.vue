<script setup>
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useConfigStore } from '@/stores/configStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import starOffIcon from '@/assets/icons/star-off.svg'
import starOnIcon from '@/assets/icons/star-on.svg'

const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()
const props = defineProps({ cityItem: { type: Object, required: true } })

const isFavorite = computed(() => favoriteStore.favoriteCityId === props.cityItem.id)

function handleToggleFavorite() {
  const willBeFavorite = favoriteStore.favoriteCityId !== props.cityItem.id
  favoriteStore.toggleFavorite(props.cityItem.id)
  ElMessage.success(
    willBeFavorite
      ? `${props.cityItem.name} 즐겨찾기 등록`
      : `${props.cityItem.name} 즐겨찾기 해제`,
  )
}

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
      <button class="btn-favorite" @click.stop="handleToggleFavorite">
        <img :src="isFavorite ? starOnIcon : starOffIcon" class="star-icon" alt="즐겨찾기" />
      </button>
      {{ cityItem.name }} ({{ cityItem.status }})
    </h4>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <el-tag v-if="cityItem.temp >= 25" type="danger">🔥 더움 (25도 이상)</el-tag>
    <el-tag v-else type="info">❄️ 선선함 (25도 미만)</el-tag>

    <el-button
      class="btn-detail"
      size="small"
      type="primary"
      @click.stop="emit('click-detail', cityItem.name, cityItem.status)"
    >
      상세보기
    </el-button>
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
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
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
