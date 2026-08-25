import './assets/exercise.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import AppExercise from './AppExercise.vue'
import router from './router'

const appExercise = createApp(AppExercise)

appExercise.use(createPinia())
appExercise.use(router)

appExercise.mount('#app')
