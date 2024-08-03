<template>
  <button :class="buttonClasses">
    <slot />
  </button>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    variant: {
      type: String,
      default: 'confirm',
      validator(value) {
        return ['confirm', 'cancel', 'link'].includes(value);
      },
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['large', 'medium','small'].includes(value);
      },
    },
  });

  const buttonClasses = computed(() => {
    const classes = { 'base-button': true };

    classes[`base-button_variant_${props.variant}`] = true;
    classes[`base-button_size_${props.size}`] = true;

    return classes;
  });
</script>

<style scoped lang="scss">
  .base-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding:20px;

    &_size_large {
      width:100%;
      font-size:large;
      font-weight: bold;
      height: 50px;
    }
    &_size_medium {
      width:50%;
      font-size:medium;
      font-weight: normal;
      height: 60px;
    }

    &_size_small {
      width:27%;
      font-size:small;
      font-weight: normal;
      height: 30px;
    }

    &_variant_confirm {
      background: #707ae4;
      color: white;

      &:hover {
        background-color: rgb(57, 59, 168); 
      }

      &:disabled {
        opacity: 0.56;
        background-color: rgb(173, 173, 173);
      }
    }

    &_variant_link {
      background: white;
      border:1px solid #6b96b7 ;
      padding:10px;

      &:hover {
        background-color: rgb(242, 243, 249); 
      }

      &:disabled {
        opacity: 0.56;
        background-color: rgb(173, 173, 173);
      }
    }

  }
</style>
