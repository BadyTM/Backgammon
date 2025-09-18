<script setup lang="ts">
import { computed, onMounted, shallowRef } from "vue";

const colors = shallowRef({
  oddTriangleColor: "#766122",
  evenTriangleColor: "#d3bc78",
  boardBorderColor: "#493e1dff",
  boardInnerColor: "#aca89dff",
});

const sizes = shallowRef({
  boardHeight: 300,
  boardWidth: 400,
  smallerBorder: 20,
  biggerBorder: 40,
  get triangleHeight() {
    return this.boardHeight * 0.4;
  },
  get triangleOffset() {
    return (this.boardWidth - this.biggerBorder * 2) / 12;
  },
  get triangleWidth() {
    return this.triangleOffset * 0.9;
  },
  get triangleMargin() {
    return (this.triangleOffset - this.triangleWidth) / 2;
  },
});

const backgammonBoard = shallowRef<HTMLCanvasElement>();
const ctx = computed(() => backgammonBoard.value?.getContext("2d"));

const drawSingleTriangle = (x: number, y: number, width: number, height: number, color: string): void => {
  if (!ctx.value) {
    return;
  }
  const directionCoordinates = y > sizes.value.boardHeight / 2 ? -height : height;
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

const drawInnerBoard = (): void => {
  if (!ctx.value) {
    return;
  }
  ctx.value.save();
  ctx.value.fillStyle = colors.value.boardInnerColor;
  ctx.value.fillRect(0, 0, sizes.value.boardWidth, sizes.value.boardHeight);
  ctx.value.fillStyle = colors.value.boardBorderColor;
  ctx.value.fillRect(sizes.value.boardWidth / 2 - sizes.value.triangleMargin / 2, 0, sizes.value.triangleMargin, sizes.value.boardHeight);
  ctx.value.restore();
};

const drawBorders = (): void => {
  if (!ctx.value) {
    return;
  }
  ctx.value.save();
  ctx.value.fillStyle = colors.value.boardBorderColor;
  ctx.value.fillRect(0, 0, sizes.value.boardWidth, sizes.value.smallerBorder);
  ctx.value.fillRect(0, sizes.value.boardHeight - sizes.value.smallerBorder, sizes.value.boardWidth, sizes.value.smallerBorder);
  ctx.value.fillRect(0, 0, sizes.value.biggerBorder, sizes.value.boardHeight);
  ctx.value.fillRect(sizes.value.boardWidth - sizes.value.biggerBorder, 0, sizes.value.biggerBorder, sizes.value.boardHeight);
  ctx.value.restore();
};

const drawTriangles = (): void => {
  for (let i = 0; i < 12; i++) {
    const isEven = i % 2 === 0;
    const x = sizes.value.triangleOffset * i + sizes.value.triangleMargin + sizes.value.biggerBorder;
    const topTriangleColor = isEven ? colors.value.oddTriangleColor : colors.value.evenTriangleColor;
    const bottomTriangleColor = isEven ? colors.value.evenTriangleColor : colors.value.oddTriangleColor;
    drawSingleTriangle(x, 0, sizes.value.triangleWidth, sizes.value.triangleHeight, topTriangleColor);
    drawSingleTriangle(x, sizes.value.boardHeight, sizes.value.triangleWidth, sizes.value.triangleHeight, bottomTriangleColor);
  }
};

onMounted(() => {
  drawInnerBoard();
  drawTriangles();
  drawBorders();
});
</script>

<template>
  <canvas
    ref="backgammonBoard"
    class="backgammon-board"
    :width="sizes.boardWidth"
    :height="sizes.boardHeight"
  ></canvas>
</template>

<style scoped lang="scss">
.backgammon-board {
  width: 400px;
  height: 300px;
}
</style>
