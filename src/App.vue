<script setup>
// 1. 학습환경 구성
import SampleOne from './components/practices/basic/SampleOne.vue'
import SampleTwo from './components/practices/basic/SampleTwo.vue'

// 2. Vue Directive
import VueHtml from './components/practices/basic/VueHtml.vue'
import VueHtmlXss from './components/practices/basic/VueHtmlXss.vue'
import VueText from './components/practices/basic/VueText.vue'
import VueBind from './components/practices/basic/VueBind.vue'
import VueBindClass from './components/practices/basic/VueBindClass.vue'
import VueBindStyle from './components/practices/basic/VueBindStyle.vue'
import VueBindShorthand from './components/practices/basic/VueBindShorthand.vue'
</script>

<template>
  <h1>Hello Skala-Vue</h1>
  <div style="padding: 20px">
    <h2>1. 학습환경구성</h2>
    <SampleOne />
    <hr />
    <SampleTwo />
    <h2>2. Vue Directive</h2>
    <VueHtml />
    <hr />
    <VueHtmlXss />
    <hr />
    <VueText />
    <hr />
    <VueBind />
    <hr />
    <VueBindClass />
    <hr />
    <VueBindStyle />
    <hr />
    <VueBindShorthand />
  </div>
</template>
