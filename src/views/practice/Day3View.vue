<script setup>
// 1. Component Lifecycle
import LifecycleParent from '@/components/practices/component/LifecycleParent.vue'

// 2. Props & Emits
import PropsEmitsParent from '@/components/practices/component/PropsEmitsParent.vue'

// 3. Component Slot
import SlotDefaultParent from '@/components/practices/component/SlotDefaultParent.vue'
import SlotNamedParent from '@/components/practices/component/SlotNamedParent.vue'
import SlotScopedParent from '@/components/practices/component/SlotScopedParent.vue'
</script>

<template>
  <div class="practice-container">
    <h1>Day 3 - Component 실습</h1>
    <h2>1. Component Lifecycle</h2>
    <hr />
    <LifecycleParent />
    <hr />
    <h2>2. Props & Emits</h2>
    <hr />
    <PropsEmitsParent />
    <hr />
    <h2>3. Component Slot</h2>
    <hr />
    <SlotDefaultParent />
    <hr />
    <SlotNamedParent />
    <hr />
    <SlotScopedParent />
    <hr />
  </div>
</template>
