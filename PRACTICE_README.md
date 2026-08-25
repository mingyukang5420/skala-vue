# skala-vue

## 학습환경 구성

### 1. 반응형 데이터 예제

#### 1-1. 학습 목표

- 일반 변수와 반응성 변수의 차이점을 이해한다.

#### 1-2. 작업 파일

- src/App.vue
- src/components/practices/basic/SampleOne.vue

#### 1-3. 결과 화면

1. 최초 접속
   ![반응형 예제 초기 화면](docs/images/practice/0824-01-01.png)
1. 일반 변수 증가 버튼 2회 클릭
   ![반응형 예제 일반 변수 증가](docs/images/practice/0824-01-02.png)
1. 반응성 변수 증가 버튼 3회 클릭
   ![반응형 예제 반응성 변수 증가](docs/images/practice/0824-01-03.png)

<hr>

### 2. JavaScript 표현식을 Text Interpolation에 사용

#### 2-1. 학습 목표

- Text Interpolation에서 JavaScript Expressions (JavaScript 표현식)을 사용할 수도 있다.

#### 2-2. 작업 파일

- src/App.vue
- src/components/practices/basic/SampleTwo.vue

#### 2-3. 결과 화면

1. 자바스크립트 표현식 출력 화면
   ![자바스크립트 표현식 출력 화면](docs/images/practice/0824-02-01.png)

<hr>

## Vue Directive

### 1. `v-html`과 `v-text`

#### 1-1. 학습목표

- 일반 보간법과 v-html 디렉티브 사용의 차이를 이해한다.

#### 1-2. 작업 파일

- src/App.vue
- src/components/practices/basic/VueHtml.vue
- src/components/practices/basic/VueHtmlXss.vue

#### 1-3. 결과화면

1. v-html, v-text 출력화면
   ![v-html과 v-text 출력](docs/images/practice/0824-03-01.png)

<hr>

### 2. `v-bind`

#### 2-1. 학습목표

- v-bind를 이용하여 HTML 태그 내부의 속성에 js값을 동적으로 연결할 수 있다.
- v-bind를 이용하여 스타일 시트를 동적으로 관리할 수 있다.
- v-bind를 이용하여 클래스 바인딩처럼 스타일 속성을 제어할 수 있다.
- v-bind 적용 시 연결할 자바스크립트 변수명과 HTML 속성명이 일치할 경우 코드를 단축할 수 있다.

#### 2-2. 작업 파일

- src/App.vue
- src/components/practices/basic/VueBind.vue
- src/components/practices/basic/VueBindClass.vue
- src/components/practices/basic/VueBindStyle.vue
- src/components/practices/basic/VueBindShorthand.vue

#### 2-3. 결과화면

![v-bind 결과화면](docs/images/practice/0824-04-01.png)

<hr>

### 3. `v-if`, `v-else-if`, `v-else`, `v-show`

#### 3-1. 학습목표

- javascript의 조건식의 결과 여부에 따라 HTML 태그를 화면에 그릴지, 아니면 지울지 결정하는 제어문을 다룰 수 있다.

#### 3-2. 작업파일

- src/App.vue
- src/components/practices/basic/VueIf.vue
- src/components/practices/basic/VueShow.vue

#### 3-3. 결과화면

![v-if v-show] 결과화면(docs/images/practice/0824-05-01.png)

<hr>

### 4. `v-for`

#### 4-1. 학습목표

- 배열이나 객체를 사용해서 뷰에서 반복적으로 렌더링하는 HTML Element를 생성할 수 있다.

#### 4-2. 작업파일

- src/App.vue
- src/components/practices/basic/VueFor.vue

#### 4-3. 결과화면

![v-for 결과 화면](docs/images/practice/0824-06-01.png)

<hr>

### 5. `v-for`

#### 5-1. 학습목표

- 배열이나 객체를 사용해서 뷰에서 반복적으로 렌더링하는 HTML Element를 생성할 수 있다.

#### 5-2. 작업파일

- src/App.vue
- src/components/practices/basic/VueFor.vue

#### 5-3. 결과화면

![v-for 결과 화면](docs/images/practice/0824-06-01.png)

<hr>

### 6. `v-pre`, `v-cloak`, `v-once`, `v-memo`

#### 6-1. 학습목표

- Vue의 템플릿 컴파일러가 Vue 문법으로 해석(Compile)하지 않고, 써진 그대로 HTML 텍스트로 화면에 표시하라고 지시할 수 있다.
- Vue 어플리케이션의 렌더링 과정에서 데이터 바인딩이 완료되기 전에 Template을 노출하면 {{ message }} 같은 해석 안 된 뼈대 문자열이 그대로 노출되는 현상을 예방할 수 있다.
- 해당 요소와 그 하위 요소는 최초에 한 번만 반응형으로 렌더링하고, 그 이후부터는 데이터가 변경되어도 DOM은 갱신되지 않도록 할 수 있다.
- 지정한 조건(변수)이 바뀔 때만 태그 내부를 업데이트하고, 그렇지 않으면 이전에 그려둔 화면(캐시)을 그대로 재사용할 수 있다.

#### 6-2. 작업파일

- src/App.vue
- src/components/practices/basic/VuePre.vue
- src/components/practices/basic/VueCloak.vue
- src/components/practices/basic/VueOnce.vue
- src/components/practices/basic/VueMemo.vue

#### 6-3. 결과화면

![v-pre, v-cloak, v-once, v-memo 결과 화면](docs/images/practice/0824-07-01.png)

<hr>

## Vue Event Handling

### 1. `v-on` 이벤트 핸들러

#### 1-1. 학습목표

- DOM 요소에 이벤트 리스너를 연결하여 이벤트를 감지하고 처리할 수 있다.

#### 1-2. 작업 파일

- src/App.vue
- src/components/practices/basic/EventBasic.vue

#### 1-3. 결과화면

1. v-on 이벤트 리스너 활용
   ![v-on basic example](docs/images/practice/0825-01-01.png)

<hr>

### 2. 이벤트 객체

#### 2-1. 학습목표

- 사용자가 웹페이지에서 버튼을 클릭하거나, 키보드를 누르거나, 마우스를 움직이는 등의 "이벤트"를 발생시켰을 때 브라우저가 자동으로 생성하는 객체를 이용하여 이벤트를 관리할 수 있다.

#### 2-2. 작업 파일

- src/App.vue
- src/components/practices/basic/EventObject.vue

#### 2-3. 결과화면

1. v-on 이벤트 객체 예제
   ![v-on event object example](docs/images/practice/0825-02-01.png)

<hr>

### 3. 이벤트 수식어

#### 3-1. 학습목표

- 이벤트 리스너의 기본 동작을 보완하거나 제어하는 데 사용되는 특수 접미어를 활용할 수 있다.

#### 3-2. 작업 파일

- src/App.vue
- src/components/practices/basic/EventModifier.vue

#### 3-3. 결과화면

1. v-on 이벤트 수식어 예제
   ![v-on event modifier example](docs/images/practice/0825-03-01.png)

<hr>

## Vue Form Handling

### 1. `v-model` 양방향 바인딩

#### 1-1. 학습목표

- v-bind와 v-on:input을 결합하여 양방향 바인딩이 완성됨을 알 수 있다.
- v-model을 이용하여 간단하게 양방향 바인딩을 구현할 수 있다.

#### 1-2. 작업 파일

- src/App.vue
- src/components/practices/basic/ModelBasic.vue

#### 1-3. 결과화면

1. v-model 활용 양방향 바인딩
   ![v-model 이용한 양방향 바인딩](docs/images/practice/0825-04-01.png)

<hr>

### 2. HTML의 Form 요소와 v-model 매핑

#### 2-1. 학습목표

- v-model로 양방향 바인딩을 할 때 HTML 요소의 특성 및 동작 방식과 일치하도록 ref 초기값을 선언해 두어야 예외나 의도치 않은 버그를 막을 수 있다.

#### 2-2. 작업 파일

- src/App.vue
- src/components/practices/basic/ModelForm.vue

#### 2-3. 결과화면

1. Form 요소와 v-model 매핑
   ![map v-model with form element](docs/images/practice/0825-05-01.png)

<hr>

### 3. v-model 수식어

#### 3-1. 학습목표

- v-model 수식어를 이용하여 입력 요소의 동작 방식이나 수집되는 데이터 형태를 손쉽게 제어할 수 있다.

#### 3-2. 작업 파일

- src/App.vue
- src/components/practices/basic/ModelModifier.vue

#### 3-3. 결과화면

1. v-model Modifier
   ![v-on event modifier example](docs/images/practice/0825-06-01.png)

<hr>

## Vue Style

### 1. Vue Style Example

#### 1-1. 학습목표

- style과 style scoped의 차이점을 이해한다.

#### 1-2. 작업 파일

- src/App.vue
- src/components/practices/basic/StyleScoped.vue

#### 1-3. 결과화면

1. style scoped 적용 예제
   ![style scoped 적용 예제](docs/images/practice/0825-07-01.png)