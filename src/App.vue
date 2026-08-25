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
import VueIf from './components/practices/basic/VueIf.vue'
import VueShow from './components/practices/basic/VueShow.vue'
import VueFor from './components/practices/basic/VueFor.vue'
import VuePre from './components/practices/basic/VuePre.vue'
import VueCloak from './components/practices/basic/VueCloak.vue'
import VueOnce from './components/practices/basic/VueOnce.vue'
import VueMemo from './components/practices/basic/VueMemo.vue'

// 3. Vue Event Handling
import EventBasic from './components/practices/basic/EventBasic.vue'
import EventObject from './components/practices/basic/EventObject.vue'
import EventModifier from './components/practices/basic/EventModifier.vue'


// 4. Vue Form Handling
import ModelBasic from './components/practices/basic/ModelBasic.vue'
import ModelForm from './components/practices/basic/ModelForm.vue'
import ModelModifier from './components/practices/basic/ModelModifier.vue'

// 5. Vue Style Handling
import StyleScoped from './components/practices/basic/StyleScoped.vue'
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
    <hr />
    <VueIf />
    <hr />
    <VueShow />
    <hr />
    <VueFor />
    <hr />
    <VuePre />
    <VueCloak />
    <VueOnce />
    <VueMemo />
    <hr />
    <h2>3. Vue Event Handling</h2>
    <EventBasic />
    <hr />
    <EventObject />
    <hr />
    <EventModifier />
    <h2>4. Vue Form Handling</h2>
    <ModelBasic />
    <hr />
    <ModelForm />
    <hr />
    <ModelModifier />
    <h2>5. Vue Style Handling</h2>
    <StyleScoped />
    <hr />
  </div>
</template>

<style>
/* 교안으로 제공된 css 적용 */
@import '@/assets/practice.css';
</style>
