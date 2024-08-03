<script setup>
  import { ref } from "vue";
  const currentSlide = ref(1);
  const props = defineProps(["imagesLength"]);
  const pagination = (n) => {
    currentSlide.value = n;
  };
</script>

<template>
  <div class="carousel">
    <slot :currentSlide="currentSlide"></slot>
    <div class="carousel__pagination">
      <div
        @click="pagination(n)"
        v-for="n in props.imagesLength"
        :key="n"
        class="carousel__dot"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.carousel {
  width:200px;
  height: 500px;

  &__pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 140px;
    box-sizing: border-box;
    transition: 0.6s ease;
    cursor: pointer;
  }
  &__dot {
    height: 5px !important;
    width: 5px !important;
    border: 1px solid white;
    border-radius: 50%;
    margin: 2px;
    &:active {
      color: rgb(255, 253, 255);
      background-color: rgba(255, 255, 255);
    }
  }
}
</style>
