<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      
      <div class="flex flex-col items-center">
        
        <div class="relative w-32 h-32 mb-8">
          
          <div class="absolute inset-0 logo-mask bg-gray-400"></div>

          <div class="absolute inset-0 logo-mask overflow-hidden">
            
            <div class="water-wave absolute left-1/2 w-[250%] h-[250%] bg-blue-500 rounded-[40%] opacity-90"></div>
            <div class="water-wave absolute left-1/2 w-[250%] h-[250%] bg-blue-400 rounded-[43%] opacity-50 animation-delay-300"></div>
            
          </div>
        </div>

        <h3 class="text-xl font-bold text-white mb-2">Analyzing your notes</h3>
        <p class="text-gray-400 text-sm tracking-wide">
          Brewing faster than 3-in-1
        </p>
        
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
}>();
</script>

<style scoped>
.logo-mask {
  mask-image: url('/public/logo.png');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-image: url('/public/logo.png');
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
}

.water-wave {
  transform: translateX(-50%);
  animation: fillUp 3s ease-in-out forwards, spin 4s linear infinite;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

@keyframes spin {
  0% { transform: translateX(-50%) rotate(0deg); }
  100% { transform: translateX(-50%) rotate(360deg); }
}

@keyframes fillUp {
  0% { top: 100%; }
  100% { top: -20%; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>