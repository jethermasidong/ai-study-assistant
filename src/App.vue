<template>
  <div class="min-h-screen">
    
    <Header />
    
    <main class="bg-black">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>