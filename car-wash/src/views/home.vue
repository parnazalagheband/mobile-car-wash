<script setup>
import { ref } from "vue";

import Navbar from "@/components/common/main-navbar.vue";
import IntroductionVideo from "../components/view/introduction-video.vue";
import BaseButton from "@/components/common/base-button.vue";
import ProgressBar from "@/components/view/progress-bar.vue";
</script>

<template>
  <div class="container">
      <navbar />
    <div class="introduction">
      <div class="introduction__content content">
        <h1 class="content__title">کوییک واش</h1>
        <p class="content__summary">
          تجربه‌ی تمیزی و درخشندگی بی‌نظیر در هر زمان و هر مکان!
        </p>
        <div class="content__description">
          ما معتقدیم که هر خودرو نیاز به مراقبت ویژه‌ای دارد و به همین دلیل
          خدمات ما متنوع و منحصربه‌فرد هستند. با تجهیزات پیشرفته و تیمی متخصص،
          ما به شما اطمینان می‌دهیم که خودروی شما همیشه در بهترین وضعیت خود
          باشد. ما به جزئیات اهمیت می‌دهیم و هدف ما راحتی و رضایت شماست.
        </div>
        <base-button class="content__button" varient="confirm" size="medium">
          ثبت سفارش
        </base-button>
      </div>
      <div class="introduction__video">
        <introduction-video />
      </div>
    </div>
    <div class="step-progress-bar">
      <h3 class="step-progress-bar__title">مراحل ثبت سفارش</h3>
      <progress-bar class="step-progress-bar__bar" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  background-color: #eef9f8;
  min-height: 100vh;
  max-width: 100%;
  padding:100px;
}
.introduction {
  display: flex;
  justify-content: space-between;
  padding: 50px;
  margin-top:30px;
  background-color: white;
  border-radius: 20px;
}
.content {
  padding-left: 50px;
  &__title {
    color: gray;
  }
  &__summary {
    color: rgb(198, 197, 197);
    margin-top: 15px;
  }
  &__description {
    margin-top: 25px;
    color: gray;
    font-size: 20px;
    line-height: 1.8;
  }
  &__button {
    margin-top: 30px;
  }
}
.step-progress-bar{
  &__title{
    margin-top:100px;
    color: gray;
  }
  &__bar{
    margin-top:80px;
  }
}
</style>
