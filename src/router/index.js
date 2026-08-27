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
      // 과제4·5는 과제6과 화면 파일을 전부 공유하도록 발전해서 최종본(과제6)으로 리다이렉트만 유지
      path: '/exercise/4',
      redirect: { name: 'exercise-6' },
    },
    {
      path: '/exercise/5',
      redirect: { name: 'exercise-6' },
    },
    {
      // 부모(exercise-6)는 children을 가진 래퍼 라우트라, named navigation 시 기본 자식(exercise-6-home)이
      // route.matched에 자동으로 안 들어가는 Vue Router 특성이 있음 — 그래서 AppNavBar 등에서 "진입 시 대시보드
      // 표시"를 원할 땐 부모(exercise-6)가 아니라 자식(exercise-6-home) 이름으로 직접 링크해야 함.
      path: '/exercise/6',
      name: 'exercise-6',
      component: () => import('../views/exercise/Exercise6View.vue'),
      children: [
        {
          path: '',
          name: 'exercise-6-home',
          component: () => import('../views/WeatherRouterHomeView.vue'),
        },
        {
          path: 'about',
          name: 'exercise-6-about',
          component: () => import('../views/WeatherAboutView.vue'),
        },
        {
          path: 'weather/:cityId',
          name: 'exercise-6-detail',
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
