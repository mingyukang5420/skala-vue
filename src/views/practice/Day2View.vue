<script setup>
// 1. Reactive State
import ReactiveRef from '@/components/practices/composition/ReactiveRef.vue'
import ReactivePractice from '@/components/practices/composition/ReactivePractice.vue'

// 2. Computed & Watchers
import ComputedBasic from '@/components/practices/composition/ComputedBasic.vue'
import WatchersBasic from '@/components/practices/composition/WatchersBasic.vue'
import WatchersMulti from '@/components/practices/composition/WatchersMulti.vue'
import WatchersDeep from '@/components/practices/composition/WatchersDeep.vue'
import WatchersReactive from '@/components/practices/composition/WatchersReactive.vue'
import WatchersRefArray from '@/components/practices/composition/WatchersRefArray.vue'
import WatchersReactiveArray from '@/components/practices/composition/WatchersReactiveArray.vue'
import WatchersWatchEffect from '@/components/practices/composition/WatchersWatchEffect.vue'
</script>

<template>
  <div class="practice-container">
    <h1>Day 2 - Composition API 실습</h1>
    <h2>1. Reactive State</h2>
    <ReactiveRef />
    <hr />
    <ReactivePractice />
    <hr />
    <h2>2. Computed & Watchers</h2>
    <ComputedBasic />
    <hr />
    <WatchersBasic />
    <hr />
    <WatchersMulti />
    <hr />
    <WatchersDeep />
    <hr />
    <WatchersReactive />
    <hr />
    <WatchersRefArray />
    <hr />
    <WatchersReactiveArray />
    <hr />
    <WatchersWatchEffect />
    <hr />
  </div>
</template>
