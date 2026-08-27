<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// 번들러 환경에서 Leaflet 기본 마커 아이콘 경로가 깨지는 문제 대응
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const props = defineProps({
  cities: { type: Array, required: true },
})

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const mapContainer = ref(null)
const activeLayer = ref('precipitation_new')
const layerOptions = [
  { key: 'precipitation_new', label: '강수' },
  { key: 'clouds_new', label: '구름' },
  { key: 'temp_new', label: '기온' },
]

let map = null
let overlayLayer = null

function buildOverlayUrl(layerKey) {
  return `https://tile.openweathermap.org/map/${layerKey}/{z}/{x}/{y}.png?appid=${API_KEY}`
}

function switchLayer(layerKey) {
  activeLayer.value = layerKey
  if (overlayLayer) {
    map.removeLayer(overlayLayer)
  }
  overlayLayer = L.tileLayer(buildOverlayUrl(layerKey), { opacity: 0.6 }).addTo(map)
}

onMounted(() => {
  map = L.map(mapContainer.value).setView([36.5, 127.8], 7)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  overlayLayer = L.tileLayer(buildOverlayUrl(activeLayer.value), { opacity: 0.6 }).addTo(map)

  props.cities.forEach((city) => {
    L.marker([city.lat, city.lon]).addTo(map).bindPopup(city.name)
  })
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div>
    <div class="layer-buttons">
      <button
        v-for="option in layerOptions"
        :key="option.key"
        :class="{ active: activeLayer === option.key }"
        @click="switchLayer(option.key)"
      >
        {{ option.label }}
      </button>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped>
.layer-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.layer-buttons button {
  padding: 6px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}
.layer-buttons button.active {
  background: #3498db;
  color: #fff;
  border-color: #3498db;
}
.map-container {
  height: 320px;
  width: 100%;
  border-radius: 8px;
}
</style>
