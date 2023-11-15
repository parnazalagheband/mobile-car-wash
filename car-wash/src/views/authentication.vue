<template>
  <div class="auth-backdrop">
    <b-row class="auth-container  mx-auto rounded">
      <b-col cols="7">
        <div class="p-5">
          <div class="tabs mt-5">
            <router-link  class="tabs__route" to="/login">
              <button class="tabs__button" variant="outline-info">
                ورود
              </button></router-link
            >

            <router-link class="tabs__route"  to="/signup"
              ><button class="tabs__button" variant="outline-info">
                ثبت نام
              </button></router-link
            >
          </div>
          <div>
            <RouterView />
          </div>
        </div>
      </b-col>
      <b-col cols="5" class="p-2 rounded">
        <img class="w-100 h-100" src="@/assets/images/login-image.jpg" />
      </b-col>
    </b-row>
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped lang="scss">
.auth-backdrop {
  height: 100vh;
  width: 100vw;
  background-color: hsl(0, 8%, 88%);
  display: flex;
  align-items: center;
}
.auth-container {
  background-color: white;
  width:40%;
  height: 65%;
}
.tabs {
  display: flex;
  justify-content: space-between;
  gap:5px;
  &__button {
    width:100%;
    background-color: rgb(196, 214, 214);
    color: rgba(251, 251, 252, 0.925);
    border: 1px solid rgb(174, 190, 190);
    border-radius: 15px;
    padding: 7px;
  }
  &__route{
    width:50%;
  }
}
</style>
