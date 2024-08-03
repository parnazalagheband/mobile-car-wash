<script setup>
import { ref } from "vue";
import BaseButton from "@/components/common/base-button.vue";

const hasToken = ref(false);

const navItems = ref([
  { name: "خانه", link: "home", icon: "home" },
  { name: "درباره ما", link: "about-us", icon: "about-us" },
  { name: "تماس با ما", link: "contact-us", icon: "contact-us" },
  { name: "خدمات", link: "services", type: "normal", icon: "services" },
]);

const notLoggedInItems = ref([
  { name: "ورود", link: "login" },
  { name: "ثبت نام کاربر", link: "user-signup" },
  { name: "ثبت نام همیار", link: "worker-signup" },
]);
</script>

<template>
  <nav class="navbar">
    <ul>
      <li v-for="item in navItems" :key="item.name">
        <img class="navbar__icon" :src="`src/assets/icon/${item.icon}.svg`" />
        <router-link class="navbar__link" :to="{ name: item.link }">{{
          item.name
        }}</router-link>
      </li>
    </ul>
    <ul v-if="!hasToken">
      <li v-for="item in notLoggedInItems" :key="item.name">
          <router-link class="navbar__link" :to="{ name: item.link }">{{
            item.name
          }}</router-link>
      </li>
    </ul>
    <ul v-else>
      <li>
        <router-link class="navbar__link" :to="{ name: 'dashboard' }"
          >داشبورد</router-link
        >
      </li>
      <li>سارا صادقی</li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  right:0;
  width: 100%;
  height: 100px;
  background-color: white;
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &__icon {
    width: 40px;
    height: 40px;
    padding: 5px;
  }

  &__link {
    text-decoration: none;
    color: rgb(152, 151, 151);

    &:hover {
      color: rgb(106, 105, 107);
      font-weight: bold;
    }
  }
}

.navbar ul {
  display: flex;
  gap: 50px;
}
</style>
