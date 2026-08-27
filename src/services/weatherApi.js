import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const HOLIDAY_BASE_URL = 'https://date.nager.at/api/v3/PublicHolidays'
const CACHE_TTL_MS = 10 * 60 * 1000

function getCached(key, ttlMs) {
  const raw = localStorage.getItem(key)
  if (!raw) return null
  const { timestamp, data } = JSON.parse(raw)
  if (Date.now() - timestamp > ttlMs) return null
  return data
}

function setCache(key, data) {
  localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }))
}

export async function fetchCurrentWeather(cityId, lat, lon) {
  const cacheKey = `weather_current_${cityId}`
  const cached = getCached(cacheKey, CACHE_TTL_MS)
  if (cached) return cached

  const response = await axios.get(WEATHER_BASE_URL, {
    params: { lat, lon, appid: API_KEY, units: 'metric', lang: 'kr' },
  })
  setCache(cacheKey, response.data)
  return response.data
}

export function formatUnixToLocalTime(unixSeconds, timezoneOffsetSeconds) {
  const localMs = (unixSeconds + timezoneOffsetSeconds) * 1000
  const date = new Date(localMs)
  const hh = String(date.getUTCHours()).padStart(2, '0')
  const mm = String(date.getUTCMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

export async function fetchHolidays(year, countryCode = 'KR') {
  const cacheKey = `holidays_${countryCode}_${year}`
  const cached = getCached(cacheKey, CACHE_TTL_MS)
  if (cached) return cached

  const response = await axios.get(`${HOLIDAY_BASE_URL}/${year}/${countryCode}`)
  setCache(cacheKey, response.data)
  return response.data
}
