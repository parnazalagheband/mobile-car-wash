<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import router from "@/router";
import BaseInput from "@/components/common/base-input.vue";
import BaseButton from "@/components/common/base-button.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { responseList } from  "../responses/responses";

const emit = defineEmits(["update:modelValue"]);
const $toast = useToast();

const email = ref();
const password = ref();
const emailError = ref(false);
const hidePass = ref(true);
const disable = ref(true);
const passwordField = ref("password");
const emailValidation = ref("");
const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const hide = () => {
  hidePass.value = !hidePass.value;
  if (passwordField.value == "password") passwordField.value = "text";
  else passwordField.value = "password";
};

const onUpdateValue = (emailValue) => {
  if (emailValue.match(emailformat) == null && emailValue != "") {
    emailValidation.value = responseList.authentication["email-validation"];
    emailError.value = true;
  } else {
    emailValidation.value = "";
    emailError.value = false;
  }
};

async function login() {
  try {
    const response = await axios({
      url: "http://127.0.0.1:8000/accounts/login/",
      method: "post",
      data: {
        email: email.value,
        password: password.value,
      },
    });
    Cookies.set('token', response.data.access)
    Cookies.set('refresh', response.data.refresh)
    $toast.open({
      message: responseList.authentication["success-login"],
      position: "top-left",
      type: "success",
    });
    router.push({ name: "home" });
  } catch (error) {
    $toast.open({
      message: responseList.authentication["failed-login"],
      position: "top-left",
      type: "error",
    });
  }
}

watch(
  () => [email.value, password.value],
  () => {
    if (email.value && password.value && emailError.value == false) {
      disable.value = false;
    } else disable.value = true;
  }
);
</script>

<template>
  <div class="login-container">
    <img
      @click="$router.go(-1)"
      class="login-container__back"
      src="../assets/icon/back.svg"
    />
    <h1>ورود</h1>
    <form class="login-form" @submit.prevent="login">
      <base-input
        @update:modelValue="(value) => onUpdateValue(value)"
        class="login-form__input"
        v-model:modelValue="email"
        :inputValue="email"
        label="ایمیل"
        icon="email"
        type="email"
        :error="emailError"
      />
      <p class="login-form__invalid-email">
        {{ emailValidation }}
      </p>
      <base-input
        class="login-form__input"
        v-model:modelValue="password"
        :inputValue="password"
        label="رمز عبور"
        icon="password"
        :type="passwordField"
      >
        <template #eye>
          <div>
            <img
              class="login-form__eye"
              v-if="hidePass"
              @click="hide"
              src="@/assets/icon/eye-closed.svg"
            />
            <img
              class="login-form__eye"
              v-else
              @click="hide"
              src="@/assets/icon/eye.svg"
            />
          </div> </template
      ></base-input>
      <base-button
        class="login-form__button"
        :disabled="disable"
        varient="confirm"
        size="large"
      >
        ورود
      </base-button>
    </form>
    <div class="signup-links">
      <span>حساب کاربری ندارید؟</span>
      <base-button size="small" variant="link">
        <router-link class="signup-links__link" :to="{ name: 'worker-signup' }"
          >ثبت نام همیار</router-link
        >
      </base-button>
      <base-button size="small" variant="link">
        <router-link class="signup-links__link" :to="{ name: 'user-signup' }"
          >ثبت نام کاربر</router-link
        >
      </base-button>
    </div>
    <div class="forget-password-link">
      <router-link
        class="forget-password-link__link"
        :to="{ name: 'forgetpassword' }"
        >رمز عبور خود را فراموش کرده اید؟</router-link
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  padding: 50px;
  &__back {
    width: 35px;
    height: 35px;
  }
}

.login-form {
  &__input {
    margin-top: 30px;
  }

  &__eye {
    width: 30px;
    height: 30px;
  }

  &__button {
    margin-top: 50px;
  }

  &__invalid-email {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
}

.signup-links {
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 7px;

  &__link {
    text-decoration: none;
  }
}

.forget-password-link {
  margin-top: 10px;
  &__link {
    text-decoration: none;
  }
}
</style>
