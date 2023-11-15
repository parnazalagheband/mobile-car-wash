<template>
  <div>
    <button :class="[type == 'auth' ? 'auth' : '']">
      <b-spinner v-if="loading" label="Spinning"></b-spinner>
      <slot v-if="!loading"></slot>
    </button>
  </div>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
  },
  loading: {
    type: Boolean,
  },
});
</script>
<style scoped lang="scss">
.auth {
  width: 100%;
  background-color: rgb(30, 141, 141);
  color: rgba(251, 251, 252, 0.925);
  border: 1px solid rgb(174, 190, 190);
  border-radius: 15px;
  padding: 10px;
}
</style>
