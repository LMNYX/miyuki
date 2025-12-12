<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 900,
  height: 250
})

const chartRef = ref<HTMLCanvasElement | null>(null)
const hoveredSection = ref<number | null>(null)

const points: [number, number][] = [
  [0, 0],
  [100, 100],
  [200, 50],
  [300, 70],
  [400, 100],
  [450, 75],
  [500, 200],
  [600, 150],
  [700, 200],
  [800, 150],
  [900, 200],
]

const drawPixelBox = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string): void => {
  ctx.fillStyle = color
  ctx.fillRect(x, y, 4, 4)
}

const drawLinePixelated = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string
): void => {
  const dx = Math.abs(x2 - x1)
  const dy = Math.abs(y2 - y1)
  const sx = x1 < x2 ? 4 : -4
  const sy = y1 < y2 ? 4 : -4
  let err = dx - dy
  let currentX = x1
  let currentY = y1

  while (true) {
    drawPixelBox(ctx, currentX, currentY, color)

    if (currentX === x2 && currentY === y2) break

    const e2 = 2 * err
    if (e2 > -dy) {
      err -= dy
      currentX += sx
    }
    if (e2 < dx) {
      err += dx
      currentY += sy
    }

    if (
      (sx > 0 && currentX > x2) ||
      (sx < 0 && currentX < x2) ||
      (sy > 0 && currentY > y2) ||
      (sy < 0 && currentY < y2)
    ) {
      break
    }
  }
}

const drawGrid = (ctx: CanvasRenderingContext2D): void => {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 1
  ctx.beginPath()

  // Start at 50, end before props.width
  for (let x = 50; x < props.width; x += 50) {
    ctx.moveTo(x + 0.5, 0)
    ctx.lineTo(x + 0.5, props.height)
  }

  // Start at 50, end before props.height
  for (let y = 50; y < props.height; y += 50) {
    ctx.moveTo(0, y + 0.5)
    ctx.lineTo(props.width, y + 0.5)
  }

  ctx.stroke()
}

const renderChart = (): void => {
  const canvas = chartRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, props.width, props.height)

  if (hoveredSection.value !== null) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.fillRect(hoveredSection.value, 0, 50, props.height)
  }

  drawGrid(ctx)

  const strokeStyle = '#ffffff'
  
  for (let i = 1; i < points.length; i++) {
    const previous = points[i - 1]
    const current = points[i]
    drawLinePixelated(ctx, previous[0], previous[1], current[0], current[1], strokeStyle)
  }
}

const handleMouseMove = (event: MouseEvent): void => {
  const canvas = chartRef.value
  if (!canvas) return
  
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  
  const section = Math.floor(x / 50) * 50
  
  // Ensure section is within valid bounds (0 to max width section)
  if (section >= 0 && section < props.width) {
    if (hoveredSection.value !== section) {
      hoveredSection.value = section
      renderChart()
    }
  } else if (hoveredSection.value !== null) {
    // If we move outside the valid hover area, clear the highlight
    hoveredSection.value = null
    renderChart()
  }
}

const handleMouseLeave = (): void => {
  hoveredSection.value = null
  renderChart()
}

onMounted(() => {
  renderChart()
})
</script>

<template>
  <div>
    <canvas 
      ref="chartRef" 
      :width="width" 
      :height="height"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    />
  </div>
</template>