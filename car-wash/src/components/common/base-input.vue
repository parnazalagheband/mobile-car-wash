<script setup>
import { ref,computed } from "vue";

const props = defineProps([
  "label",
  "icon",
  "type",
  "modelValue",
  "inputValue",
  "typeCheck",
  "error"
]);
const icon = `../src/assets/icon/${props.icon}.svg`;
const hasFocus = ref(false);

const inputClasses = computed(() => {
  return {
    "input-wrapper__input": true,
    'input-wrapper__error': props.error,
  };
});


const setStyle = () => {
  hasFocus.value = true;
};
const unsetStyle = () => {
  if (!props.inputValue) {
    hasFocus.value = false;
  }
};
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="input-wrapper" @focusin="setStyle()" @focusout="unsetStyle()">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value, props.typeCheck)"
      :class="inputClasses"
      :type="props.type"
      required
      typeCheck="email"
    />
    <div class="input-wrapper__box">
      <div class="input-wrapper__items">
        <img v-if="props.icon" :src="icon" class="input-wrapper__icon" />
        <label :class="{ focused: hasFocus }"> {{ props.label }} </label>
      </div>
      <slot name="eye"> </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  &__input {
    width: 100%;
    height: 50px;
    border-radius: 16px;
    padding-right: 55px ;
    border: 1px solid #bec1ca;
    background-color: transparent;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }
  &__box {
    width:100%;
    display: flex;
    justify-content: space-between;
    padding:0px 10px ;
    margin-top:-40px;
  }

  &__items {
    font-size: 15px;
    color: #5a5a5a;
  }

  &__icon {
    width: 35px;
    height: 35px;
    padding-left:5px;
  }

  &__error{
    border:1px solid red;
  }

}
.focused {
  font-size:13px;
  transform: translate(0px, -30px);
  width:70px;
  height: 20px;
  text-align: center;
  background-color: white;
}
</style>
