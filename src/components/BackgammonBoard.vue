<script setup lang="ts">
import { computed, onMounted, shallowRef } from "vue";

const colors = shallowRef({
  oddTriangleColor: "#766122",
  evenTriangleColor: "#d3bc78",
});

const boardHeight = shallowRef(300);
const boardWidth = shallowRef(400);
const backgammonBoard = shallowRef<HTMLCanvasElement>();
const ctx = computed(() => backgammonBoard.value?.getContext("2d"));

const drawSingleTriangle = (x: number, y: number, width: number, height: number, color: string): void => {
  if (!ctx.value) {
    return;
  }
  const directionCoordinates = y > boardHeight.value / 2 ? -height : height;
  ctx.value.save();
  ctx.value.beginPath();
  ctx.value.moveTo(x, y);
  ctx.value.lineTo(x + width / 2, y + directionCoordinates);
  ctx.value.lineTo(x + width, y);
  ctx.value.closePath();
  ctx.value.fillStyle = color;
  ctx.value.strokeStyle = color;
  ctx.value.fill();
  ctx.value.stroke();
  ctx.value.restore();
};

const drawTriangles = (): void => {
  const triangleHeight = boardHeight.value * 0.4;
  const triangleOffset = boardWidth.value / 12;
  const triangleWidth = triangleOffset * 0.9;
  const triangleMargin = (triangleOffset - triangleWidth) / 2;

  for (let i = 0; i < 12; i++) {
    const isEven = i % 2 === 0;
    const x = triangleOffset * i + triangleMargin;
    const topTriangleColor = isEven ? colors.value.oddTriangleColor : colors.value.evenTriangleColor;
    const bottomTriangleColor = isEven ? colors.value.evenTriangleColor : colors.value.oddTriangleColor;
    drawSingleTriangle(x, 0, triangleWidth, triangleHeight, topTriangleColor);
    drawSingleTriangle(x, boardHeight.value, triangleWidth, triangleHeight, bottomTriangleColor);
  }
};

onMounted(() => {
  drawTriangles();
});
</script>

<template>
  <canvas
    ref="backgammonBoard"
    class="backgammon-board"
    :width="boardWidth"
    :height="boardHeight"
  ></canvas>
</template>

<style scoped lang="scss">
.backgammon-board {
  width: 400px;
  height: 300px;
}
</style>
