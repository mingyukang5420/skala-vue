import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'exercise-1' },
    },
    {
      path: '/exercise',
      redirect: { name: 'exercise-1' },
    },
    {
      path: '/exercise/1',
      name: 'exercise-1',
      component: () => import('../views/exercise/Exercise1View.vue'),
    },
    {
      path: '/exercise/2',
      name: 'exercise-2',
      component: () => import('../views/exercise/Exercise2View.vue'),
    },
    {
      path: '/exercise/3',
      name: 'exercise-3',
      component: () => import('../views/exercise/Exercise3View.vue'),
    },
    {
      path: '/exercise/4',
      name: 'exercise-4',
      component: () => import('../views/exercise/Exercise4View.vue'),
      children: [
        {
          path: '',
          name: 'exercise-4-home',
          component: () => import('../views/WeatherRouterHomeView.vue'),
        },
        {
          path: 'about',
          name: 'exercise-4-about',
          component: () => import('../views/WeatherAboutView.vue'),
        },
        {
          path: 'weather/:cityId',
          name: 'exercise-4-detail',
          component: () => import('../views/WeatherDetailView.vue'),
        },
      ],
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
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
