<script setup lang="ts">
import { shallowRef } from "vue";

const emit = defineEmits<{
  (e: "throwDice", value: number): void;
}>();

const diceValue = shallowRef<number>(getRandomDiceNumber());

function getRandomDiceNumber(): number {
  return Math.floor(Math.random() * 6) + 1;
}

const throwDice = (): void => {
  diceValue.value = getRandomDiceNumber();
  emit("throwDice", diceValue.value);
};
</script>

<template>
  <div
    class="dice"
    @click="throwDice()"
  >
    <div
      v-for="value in diceValue"
      :key="value"
      class="dice-circle"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.dice {
  $dice-width: 5rem;
  width: $dice-width;
  height: $dice-width;
  padding: 0.25rem;
  border-radius: 10%;
  display: grid;
  grid-template-areas:
    "a . c"
    "e g f"
    "d . b";
  background-color: #e7e7e7;
  box-shadow:
    inset 0 3px rgb(234, 229, 229),
    inset 0 -3px rgb(148, 146, 146),
    inset 3px 0 rgb(186, 184, 184),
    inset -3px 0 rgb(186, 184, 184);
  cursor: pointer;
}

.dice-circle {
  $circle-width: 75%;
  width: $circle-width;
  height: $circle-width;
  border-radius: 50%;
  align-self: center;
  justify-self: center;
  background-color: black;

  &:nth-child(1) {
    grid-area: a;
  }

  &:nth-child(2) {
    grid-area: b;
  }

  &:nth-child(3) {
    grid-area: c;
  }

  &:nth-child(4) {
    grid-area: d;
  }

  &:nth-child(5) {
    grid-area: e;
  }

  &:nth-child(6) {
    grid-area: f;
  }

  &:nth-child(odd):last-child {
    grid-area: g;
  }
}
</style>
