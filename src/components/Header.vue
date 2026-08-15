<template>

  <header class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
    
    <div class="flex items-center justify-between px-6 py-2 bg-white/10 backdrop-blur-md border border-slate-200 shadow-sm rounded-full hover:border-blue-500">
      
      <router-link to="/" class="text-xl font-bold text-white tracking-tight">
        Centre
      </router-link>


      <router-link to="/upload-page" class="px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-blue-200 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        Get Started
      </router-link>

    </div>
  </header>
</template>

<script setup lang="ts">

</script>