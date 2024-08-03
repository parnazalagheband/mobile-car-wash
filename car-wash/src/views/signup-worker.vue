<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import router from "@/router";
import BaseInput from "@/components/common/base-input.vue";
import BaseButton from "@/components/common/base-button.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { responseList } from "../responses/responses";

const emit = defineEmits(["update:modelValue"]);
const $toast = useToast();

const email = ref();
const password = ref();
const phoneNumber = ref();
const firstName = ref();
const lastName = ref();
const workerId = ref();
const hidePass = ref(true);
const disable = ref(true);
const passwordField = ref("password");
const emailValidation = ref("");
const phoneValidation = ref("");
const workerIdValidation = ref("");
const emailError = ref(false);
const phoneError = ref(false);
const workIdError = ref(false);

const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const hide = () => {
  hidePass.value = !hidePass.value;
  if (passwordField.value == "password") passwordField.value = "text";
  else passwordField.value = "password";
};

const isInteger = (str) => {
  const num = Number(str);
  return Number.isInteger(num) && str.trim() !== "";
};

const onUpdateValue = (value, type) => {
  if (type == "email") {
    if (value.match(emailformat) == null && value != "") {
      emailValidation.value = responseList.authentication["email-validation"];
      emailError.value = true;
    } else {
      emailValidation.value = "";
      emailError.value = false;
    }
  }
  if (type == "phoneNumber") {
    if (value.length != 11 && value != "") {
      phoneValidation.value = responseList.authentication["phone-validation"];
      phoneError.value = true;
    } else {
      phoneValidation.value = "";
      phoneError.value = false;
    }
  }

  if (type == "workerId") {
    if ((value.length != 3 || !isInteger(value)) && value != "") {
      workerIdValidation.value =
        responseList.authentication["workId-validation"];
      workIdError.value = true;
    } else {
      workerIdValidation.value = "";
      workIdError.value = false;
    }
  }
};

async function signup() {
  try {
    const response = await axios({
      url: "http://127.0.0.1:8000/accounts/wregister/",
      method: "post",
      data: {
        email: email.value,
        password: password.value,
        first_name: firstName.value,
        last_name: lastName.value,
        phone_number: phoneNumber.value,
        workerID: workerId.value,
      },
    });
    $toast.open({
      message: responseList.authentication["success-signup"],
      position: "top-left",
      type: "success",
    });
    router.push({ name: "login" });
  } catch (errors) {
    for (const error in errors.response.data) {
      $toast.open({
        message: errors.response.data[error][0],
        position: "top-left",
        type: "error",
      });
    }
  }
}

watch(
  () => [
    email.value,
    password.value,
    firstName.value,
    lastName.value,
    phoneNumber.value,
  ],
  () => {
    if (
      email.value &&
      password.value &&
      firstName.value &&
      lastName.value &&
      phoneNumber.value &&
      emailError &&
      phoneError &&
      workIdError
    ) {
      disable.value = false;
    } else disable.value = true;
  }
);
</script>

<template>
  <div class="signup-container">
    <img
      @click="$router.go(-1)"
      class="signup-container__back"
      src="../assets/icon/back.svg"
    />
    <h2>ثبت نام همیار</h2>
    <form class="signup-form" @submit.prevent="signup">
      <base-input
        @update:modelValue="(value, type) => onUpdateValue(value, type)"
        class="signup-form__input"
        v-model:modelValue="email"
        :inputValue="email"
        label="ایمیل"
        icon="email"
        type="email"
        typeCheck="email"
        :error="emailError"
      />
      <p class="signup-form__invalid-input">
        {{ emailValidation }}
      </p>
      <base-input
        @update:modelValue="(value, type) => onUpdateValue(value, type)"
        class="signup-form__input"
        v-model:modelValue="phoneNumber"
        :inputValue="phoneNumber"
        label="تلفن همراه"
        icon="phone"
        type="text"
        typeCheck="phoneNumber"
        :error="phoneError"
      />
      <p class="signup-form__invalid-input">
        {{ phoneValidation }}
      </p>
      <base-input
        class="signup-form__input"
        v-model:modelValue="firstName"
        :inputValue="firstName"
        label="نام"
        icon="user"
        type="text"
      />
      <base-input
        @update:modelValue="(value, type) => onUpdateValue(value, type)"
        class="signup-form__input"
        v-model:modelValue="workerId"
        :inputValue="workerId"
        label="شناسه"
        icon="id"
        type="text"
        typeCheck="workerId"
        :error="workIdError"
      />
      <p v-show="workerIdValidation" class="signup-form__invalid-input">
        {{ workerIdValidation }}
      </p>
      <base-input
        class="signup-form__input"
        v-model:modelValue="lastName"
        :inputValue="lastName"
        label="نام خانوادگی"
        icon="user"
        type="text"
      />
      <base-input
        class="signup-form__input"
        v-model:modelValue="password"
        :inputValue="password"
        label="رمز عبور"
        icon="password"
        :type="passwordField"
      >
        <template #eye>
          <div>
            <img
              class="signup-form__eye"
              v-if="hidePass"
              @click="hide"
              src="@/assets/icon/eye-closed.svg"
            />
            <img
              class="signup-form__eye"
              v-else
              @click="hide"
              src="@/assets/icon/eye.svg"
            />
          </div> </template
      ></base-input>
      <base-button
        class="signup-form__button"
        :disabled="disable"
        varient="confirm"
        size="large"
      >
        ورود
      </base-button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.signup-container {
  padding: 30px;
  &__back {
    width: 35px;
    height: 35px;
  }
}

.signup-form {
  &__input {
    margin-top: 20px;
  }

  &__eye {
    width: 30px;
    height: 30px;
  }

  &__button {
    margin-top: 50px;
  }

  &__invalid-input {
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
