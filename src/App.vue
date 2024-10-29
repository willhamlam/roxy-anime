<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import IconOne from './components/IconOne.vue'
import IconTwo from './components/IconTwo.vue'
import IconThree from './components/IconThree.vue'
import IconFour from './components/IconFour.vue'

import ss1 from './assets/ss1.png'
import ss2 from './assets/ss2.png'
import ss3 from './assets/ss3.png'
import ss4 from './assets/ss4.png'

// 当前活动的索引
const activeIndex = ref(0)
const intervalId = ref(null) // 用于存储 interval ID

// 图片列表
const screenshots = [
  { id: 0, src: ss1 },
  { id: 1, src: ss2 },
  { id: 2, src: ss3 },
  { id: 3, src: ss4 }
]

const autoSwitch = () => {
  intervalId.value = setInterval(() => {
    // 当到达最后一个时，重置为第一个
    activeIndex.value = (activeIndex.value + 1) % screenshots.length
  }, 6000) // 6秒间隔
}

// 切换函数
const switchTab = (index) => {
  activeIndex.value = index
  // 重置定时器
  if (intervalId.value) {
    clearInterval(intervalId.value)
    autoSwitch()
  }
}

// 组件挂载时启动自动切换
onMounted(() => {
  autoSwitch()
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
</script>

<template>
  <div class="wrapper">
    <div class="sui-god-ray relative flex h-screen w-screen">
      <div class="ray absolute inset-x-0 inset-y-0 opacity-50"></div>

      <div class="relative w-[1280px] mx-auto">
        <div class="grid grid-cols-12 gap-4">
          <!-- col-start-2 表示从第2列开始，col-span-10 表示横跨10列 -->
          <div class="col-start-2 col-span-10">
            <div class="hero-section">
              <div class="hero-head">
                <div class="logo">
                  <img src="./assets/logo.svg" alt="logo" />
                  <span class="archivo archivo-700 text-lg">RoxyBrowser</span>
                </div>
                <ul>
                  <li><a href="" class="headnav-item">Product</a></li>
                  <li><a href="" class="headnav-item">Solutions</a></li>
                  <li><a href="" class="headnav-item">Pricing</a></li>
                  <li><a href="" class="headnav-item">Download</a></li>
                  <li><a href="" class="headnav-item">About</a></li>
                </ul>
                <ul>
                  <li><a href="" class="headnav-item">EN</a></li>
                  <li><a href="" class="headnav-item">Login</a></li>
                </ul>
              </div>
              <div class="hero-slogan mt-20 mb-28">
                <h1 class="archivo archivo-700 text-6xl mb-3">
                  Next-Generation<br />Antidetect Browser
                </h1>
                <p class="text-xl w-3/4">
                  Meet the modern standard for team-facing antidetect browser. Beautiful out of the
                  box, easy to maintain, and built to convert profits.
                </p>
                <div class="hero-actions">
                  <a href="" class="btn-primary"
                    ><img src="./assets/download 1.svg" alt="" />Download for Free</a
                  >
                  <a href="" class="btn-secondary"
                    ><img src="./assets/play.svg" alt="" />Watch Tutorial</a
                  >
                </div>
              </div>
              <div class="hero-screenshots">
                <ul class="shots-indicators">
                  <li
                    v-for="(item, index) in screenshots"
                    :key="index"
                    :class="{ active: activeIndex === index }"
                    @click="switchTab(index)"
                  >
                    <div class="indicator-content">
                      <component :is="[IconOne, IconTwo, IconThree, IconFour][index]" />
                      {{
                        [
                          'Easy-to-use Interface',
                          'Industry-leading profiles',
                          'Accounts management',
                          'Team collarbration'
                        ][index]
                      }}
                    </div>
                    <div
                      class="indicator-line"
                      :class="{ 'animate-progress': activeIndex === index }"
                    ></div>
                    <div class="indicator-line-bg"></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="shots-carousel col-span-12">
            <transition name="fade">
              <img :key="activeIndex" :src="screenshots[activeIndex].src" alt="" />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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

.hero-section {
  flex-direction: column;
}

.hero-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    img {
      width: 40px;
      margin-top: -8px;
    }
    span {
      color: #042144;
    }
  }
  ul {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
  .headnav-item {
    padding: 4px 12px;
    color: #042144;
  }
}

.hero-slogan {
  h1 {
    font-size: 64px;
    color: #042144;
  }
}

.hero-actions {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin: 32px 0;
}

.btn-primary {
  display: flex;
  padding: 10px 16px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid #349be4;
  background: #33a9ff;
  color: #fff;
  font-weight: 600;
  img {
    width: 20px;
  }
}

.shots-indicators {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
  li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    cursor: pointer;
    padding: 8px 0px;
    position: relative;
    .indicator-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      opacity: 0.4;
      font-weight: 500;
    }
    .indicator-line {
      width: 100%;
      height: 2.5px;
      background-color: #2f4868;
      border-radius: 999px;
      opacity: 0;
      z-index: 1;
    }
    .indicator-line-bg {
      width: 100%;
      height: 2.5px;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 999px;
      opacity: 0;
      position: absolute;
      bottom: 8px;
      z-index: 0;
    }
    svg path {
      fill: rgba(0, 0, 0, 1);
    }
  }
  li.active .indicator-content {
    color: #000;
    opacity: 1;
  }
  li.active .indicator-line {
    opacity: 1;
  }
  li.active .indicator-line-bg {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 修改 shots-carousel 样式以支持过渡效果 */
.shots-carousel {
  position: relative;
}

.shots-carousel img {
  position: absolute;
  width: 100%;
  border-radius: 16px;
  border: 6px solid rgba(7, 60, 109, 0.05);
}

@keyframes progress-line {
  from {
    width: 100%;
    opacity: 1;
  }
  to {
    width: 0%;
    opacity: 1;
  }
}

.shots-indicators li {
  /* ... 现有样式保持不变 ... */
  .indicator-line {
    width: 0%;
    height: 2.5px;
    background-color: #2f4868;
    border-radius: 999px;
    opacity: 0;
  }
}

.shots-indicators li.active {
  .indicator-content {
    color: #000;
    opacity: 1;
  }
  .indicator-line {
    opacity: 1;
  }
  .indicator-line.animate-progress {
    animation: progress-line 6s linear forwards;
  }
}

/* 确保动画重置 */
.shots-indicators li:not(.active) .indicator-line {
  animation: none;
  width: 0%;
}

.btn-secondary {
  display: flex;
  padding: 10px 16px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  /* border: 1px solid #e7e7e7; */
  /* background: #fff; */
  color: #000;
  font-weight: 600;
  img {
    width: 20px;
  }
}

.sui-god-ray {
  --sui-ray-bg: #f1fbfe;
  --stripes: repeating-linear-gradient(
    100deg,
    var(--sui-ray-bg) 0%,
    var(--sui-ray-bg) 7%,
    transparent 10%,
    transparent 12%,
    var(--sui-ray-bg) 16%
  );
  --rainbow: repeating-linear-gradient(
    100deg,
    #60a5fa 10%,
    #7993f9 15%,
    #f6b3e6 20%,
    #5ed8ea 25%,
    #60a5fa 30%
  );
  --aurora: repeating-linear-gradient(
    100deg,
    #3b82f6 10%,
    #a5b4fc 15%,
    #93c5fd 20%,
    #bd39c0 25%,
    #3a7aca 30%
  );
  background-color: var(--sui-ray-bg);
  transition: background-color 0.3s;
}

@keyframes ray {
  from {
    background-position:
      50% 50%,
      50% 50%;
  }

  to {
    background-position:
      350% 50%,
      350% 50%;
  }
}

.ray {
  background-image: var(--stripes), var(--rainbow);
  background-size: 300%, 200%;
  background-position:
    50% 50%,
    50% 50%;
  filter: blur(10px) invert(100%);
  mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
  pointer-events: none;
}

.ray::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--stripes), var(--rainbow);
  background-size: 200%, 100%;
  animation: ray 60s linear infinite;
  background-attachment: fixed;
  mix-blend-mode: difference;
}

.dark .sui-god-ray {
  --sui-ray-bg: rgba(0, 0, 0, 0.92);
}

.dark .ray,
.dark .ray::after {
  background-image: var(--stripes), var(--aurora);
  filter: blur(12px) invert(10%);
}
</style>
