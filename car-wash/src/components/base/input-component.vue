<template>
  <div class="input-box">
    <label class="input-box__label">{{ helperText }}</label>
    <input
      class="input-box__input"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="inputText"
      :type="type"
      :name="name"
      :value="modelValue"
    />
    <div class="input-box__icon">
      <slot name="icon"> </slot>
    </div>
  </div>
</template>
<script setup>
defineEmits(["update:modelValue"]);
const props = defineProps({
  type: {
    type: String,
  },
  inputText: {
    type: String,
  },
  helperText: {
    type: String,
  },
  name: {
    type: String,
  },
  modelValue: {
    type: String,
  },
});
</script>
<style scoped lang="scss">
.input-box {
  position:relative;
  &__input {
    width: 100%;
    border-radius: 15px;
    padding: 7px;
    border: 1px solid rgb(196, 195, 195);

  }
  &__label {
    font-size: 12px;
    color: gray;
  }
  &__icon{
    position:absolute;
    left:5%;
    bottom:7%;

  }
}
</style>
