<template>
  <div class="signup-container mt-3">
    <p class="signup-container__title"> ثبت نام در سامانه</p>
    <p class="signup-container__description">
      برای ثبت نام در سامانه ایمیل و نام کاربری خود را وارد کنید.
    </p>
    <form class="signup-form">
      <input-field
        type="email"
        inputText="ایمیل"
        name="email"
        :validation-rules="emailValidation"
        helperText="لطفا ایمیل خود را وارد کنید."
        class="mt-4"
        v-model:modelValue="email"
        :inputValue="email"
      />

      <input-field
        :type="passwordField"
        inputText="رمز عبور"
        name="password"
        :validation-rules="passwordValidation"
        helperText="لطفارمز عبور خود را وارد کنید."
        class="mt-3"
        v-model:modelValue="password"
        :inputValue="password"
      >
        <template #icon>
          <div class="icon">
            <img
              v-if="hidePass"
              @click="hide"
              src="@/assets/images/close-eye.png"
            />
            <img v-else @click="hide" src="@/assets/images/open-eye.png" />
          </div>
        </template>
      </input-field>
      <Button class="mt-4" type="auth" :loading="loading">ورود</Button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import inputField from "@/components/base/input-component.vue";
import Button from "@/components/base/button-component.vue";
const loading = ref(false);
const email = ref();
const password = ref();
const hidePass = ref(true);
const passwordField = ref("password");

const hide = () => {
  hidePass.value = !hidePass.value;
  if (passwordField.value == "password") passwordField.value = "text";
  else passwordField.value = "password";
};
</script>

<style scoped lang="scss">
.signup-container {
  &__title {
    font-size: 20px;
  }
  &__description {
    font-size: 15px;
  }
}
.signup-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
