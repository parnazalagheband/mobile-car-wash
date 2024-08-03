<template>
  <div class="step-progress">
    <div
      v-for="(step, index) in steps"
      :key="index"
      :class="[
        'step-progress__step', 
        { 'step-progress__step--done': index < currentStep, 
          'step-progress__step--active': index === currentStep 
        }
      ]"
      @mouseover="showTooltip(index)"
      @mouseleave="hideTooltip"
    >
      <div class="step-progress__number">{{ index + 1 }}</div>
      <div class="step-progress__title">{{ step }}</div>
      <div
        v-if="tooltipIndex === index"
        class="step-progress__tooltip"
        :style="tooltipStyle"
      >
        {{ step }}
      </div>
    </div>
    <!-- Connection lines -->
    <div
      v-for="index in steps.length - 1"
      :key="`line-${index}`"
      class="step-progress__line"
      :style="getLineStyle(index)"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const steps = ref(['Step 1', 'Step 2', 'Step 3', 'Step 4']);
const currentStep = ref(2); // Change this to reflect the current step (0-based index)
const tooltipIndex = ref(null); // Index of the step to show the tooltip
const tooltipStyle = ref({});

const showTooltip = (index) => {
  tooltipIndex.value = index;
  // Calculate the position of the tooltip
  const stepElement = document.querySelectorAll('.step-progress__step')[index];
  const rect = stepElement.getBoundingClientRect();
  tooltipStyle.value = {
    left: `${rect.left + rect.width / 2}px`,
    top: `${rect.top - 30}px`, // Adjust this value to position the tooltip above the step
  };
};

const hideTooltip = () => {
  tooltipIndex.value = null;
};

const getLineStyle = (index) => {
  const widthPercentage = 100 / (steps.value.length - 1);
  return {
    left: `${widthPercentage * index}%`,
    width: `${widthPercentage}%`,
    backgroundColor: index < currentStep.value - 1 ? '#4caf50' : '#dcdcdc',
  };
};
</script>

<style lang="scss" scoped>
.step-progress {
  display: flex;
  align-items: center;
  position: relative;
  width: 80%;
  max-width: 600px;
  margin: auto;

  &__step {
    text-align: center;
    flex: 1;
    position: relative;
    z-index: 1;

    .step-progress__number {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      background-color: #dcdcdc;
      color: #fff;
      margin-bottom: 10px;
    }

    .step-progress__title {
      color: #888;
    }

    &--done .step-progress__number {
      background-color: #4caf50;
    }

    &--done .step-progress__title {
      color: #4caf50;
    }

    &--active .step-progress__number {
      background-color: #2196f3;
    }

    &--active .step-progress__title {
      color: #2196f3;
    }

    &:hover .step-progress__tooltip {
      display: block;
    }
  }

  &__line {
    position: absolute;
    height: 4px;
    background-color: #dcdcdc;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
  }

  &__tooltip {
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    white-space: nowrap;
    font-size: 12px;
    display: none; /* Hidden by default, shown on hover */
    z-index: 2;
    transform: translateX(-50%);
    pointer-events: none;
  }
}
</style>
