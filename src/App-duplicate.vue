<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import createGlobe from 'cobe'

const canvasRef = ref(null)
const isScaled = ref(false)
let globe = null

const toggleScale = () => {
  isScaled.value = !isScaled.value
}

onMounted(() => {
  const width = 500
  const canvas = canvasRef.value

  let currentScale = 1
  let targetScale = 1
  let currentOffsetY = 0
  let targetOffsetY = 0
  let currentPhi = 0
  const doublePi = Math.PI * 2

  globe = createGlobe(canvas, {
    devicePixelRatio: 2,
    width: width * 2,
    height: width * 2,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: 3,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1.2, 1.2, 1.2],
    markers: [],
    scale: 1,
    offset: [0, 0],
    onRender: (state) => {
      // Adjust rotation speed based on scale state
      const rotationSpeed = isScaled.value ? 0.002 : 0.01

      currentPhi += rotationSpeed
      state.phi = currentPhi % doublePi

      if (isScaled.value) {
        targetScale = 2
        targetOffsetY = 300
      } else {
        targetScale = 1
        targetOffsetY = 0
      }

      const scaleDist = targetScale - currentScale
      const offsetYDist = targetOffsetY - currentOffsetY

      currentScale += scaleDist * 0.08
      currentOffsetY += offsetYDist * 0.08

      state.scale = currentScale
      state.offset = [0, currentOffsetY]
    }
  })

  setTimeout(() => {
    if (canvasRef.value) {
      canvasRef.value.style.opacity = '1'
    }
  }, 1000)
})

onBeforeUnmount(() => {
  if (globe) {
    globe.destroy()
  }
})
</script>

<template>
  <div class="wrapper">
    <section>
      <canvas
        ref="canvasRef"
        :style="{
          width: '500px',
          height: '500px',
          contain: 'layout paint size'
        }"
      />
      <button @click="toggleScale" style="margin-top: 20px">Toggle Scale</button>
    </section>
    <section class="hero">
      <header>
        <div class="nav-item">
          <img src="./assets/lumi-logo.png" alt="" class="logo" />
        </div>
        <div class="nav-item">
          <ul>
            <li>Product</li>
            <li>Solutions</li>
            <li>Pricing</li>
            <li>Download</li>
          </ul>
        </div>

        <div class="nav-item"></div>
      </header>
      <div class="content">
        <h1 class="archivo archivo-700 title">
          One-stop solution for your<br />
          E-Commerce
        </h1>
        <img src="./assets/fake-buttons.png" alt="" class="fake-buttons" />
      </div>
      <img src="./assets/peek.png" alt="" class="peek" />
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
    </section>
    <section>
      <img v-prlx="{ speed: 0.05, reverse: true }" src="./assets/bg-bt.png" class="platform" />
      <img v-prlx="{ speed: 0.15, reverse: true }" src="./assets/bg-md.png" class="platform" />
      <img v-prlx="{ speed: 0.2, reverse: true }" src="./assets/bg-tp.png" class="platform" />
      <div>
        <h1 class="archivo archivo-700">All websites supported</h1>
        <p class="subtitle">Lumibrowser is built for Chromium<br />Not only for a website</p>
      </div>
    </section>
    <section>
      <h1>Section 3</h1>
    </section>
  </div>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap');

.archivo {
  font-family: 'Archivo', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings: 'wdth' 100;
}

.archivo-700 {
  font-weight: 700;
}

header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 52px;
  padding: 0 4rem;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
}

header ul {
  list-style: none;
  padding: 0;
}

header ul li {
  display: inline;
  margin: 0 20px;
}

.nav-item {
  width: 400px;
}

img.logo {
  width: 149px;
  height: 52px;
}

img.peek {
  width: 1200px;
  position: absolute;
  bottom: -180px;
  z-index: 1;
}

h1 {
  font-size: 48px;
  letter-spacing: -0.96px;
  z-index: 999;
  text-align: center;
}

.hero h1 {
  font-size: 64px;
}

section.hero {
  background: radial-gradient(circle at top, #bbe1ed, #fff);
  background-size: 100% 100%;
}

section .content {
  width: 100%;
  height: 100vh;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

section {
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.fake-buttons {
  width: 600px;
  margin-top: 2rem;
  margin-bottom: 6rem;
}
.platform {
  position: absolute;
  width: 100%;
  top: 5%;
}
.subtitle {
  opacity: 0.4;
  text-align: center;
}

/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
} */

.bg {
  animation: slide 10s ease-in-out infinite alternate;
  background-image: linear-gradient(
    -30deg,
    rgba(193, 235, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.4) 50%
  );
  bottom: 0;
  left: -50%;
  opacity: 0.6;
  position: absolute;
  right: -50%;
  top: 0;
  z-index: 0;
}

.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 20s;
}

.bg3 {
  animation-duration: 30s;
}

@keyframes slide {
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
}

@media (min-width: 1024px) {
  /* header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  } */
}
</style>
