<template>
  <div class="min-h-screen bg-black text-white">
    
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center">
        <div class="mt-20">
            <h1 class="text-2xl md:text-6xl font-extrabold tracking-tight text-white mb-3 leading-tight">
                Upload, Review and Test<br class="hidden md:block" />
                your Knowledge <br class="hidden md:block" />
            </h1>
            <h2 class="text-3xl md:text-5xl tracking-tight text-white leading-tight font-cursive">
                with
            </h2>
            <h1 class="text-2xl md:text-6xl font-extrabold tracking-tight text-white mb-3 leading-tight">
                <span class="text-blue-600 bg-clip-text bg-linear-to-r from-blue-600 to-blue-500">
                Centre
                </span>
            </h1>
            
            <p class="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                An AI-powered study assistant that turns your personal notes into interactive review sessions. Centre will generate custom quizzes or flashcards in seconds to master your material.
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
                <router-link to="/upload-page" class="w-full sm:w-auto bg-blue-600 text-white px-8 py-2 rounded-xl text-md font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <ion-icon name="arrow-up-circle-outline" class="text-xl"></ion-icon>
                Upload
                </router-link>
                
                <router-link to="/contacts" class="w-full sm:w-auto bg-white text-blue-600 border-2 border-blue-100 px-8 py-2 rounded-xl text-md font-semibold hover:bg-indigo-50 transition flex items-center justify-center gap-2">
                <ion-icon name="help-circle-outline" class="text-xl"></ion-icon>
                Feedback
                </router-link>
            </div>
        </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>