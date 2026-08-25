import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '../views/WeatherHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'weather-home',
      component: WeatherHomeView,
    },
    {
      path: '/practice',
      redirect: { name: 'practice-day1' },
    },
    {
      path: '/practice/day1',
      name: 'practice-day1',
      component: () => import('../views/practice/Day1View.vue'),
    },
    {
      path: '/practice/day2',
      name: 'practice-day2',
      component: () => import('../views/practice/Day2View.vue'),
    },
    {
      path: '/practice/day3',
      name: 'practice-day3',
      component: () => import('../views/practice/Day3View.vue'),
    },
    {
      path: '/practice/day4',
      name: 'practice-day4',
      component: () => import('../views/practice/Day4View.vue'),
    },
  ],
})

export default router
