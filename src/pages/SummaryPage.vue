<template>
  <div class="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">


    <div v-if="!summary" class="text-center mt-20">
      <ion-icon name="document-text-outline" class="text-6xl text-gray-500 mb-4"></ion-icon>
      <h2 class="text-xl text-gray-300 font-semibold mb-2">No summary found</h2>
      <p class="text-sm text-gray-500 mb-6">Please upload a document to generate a summary first.</p>
      <button 
        @click="router.push('/')" 
        class="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition cursor-pointer font-medium"
      >
        Back to Upload
      </button>
    </div>

    <div v-else class="w-full max-w-4xl flex flex-col gap-8">
      
      <div class="flex items-center justify-between border-b border-gray-800 pb-4 mt-20">
        <h1 class="text-2xl font-extrabold text-white flex items-center gap-3">
            Reviewer <h1 class="font-cursive text-xl font-extralight"> by </h1> Centre
        </h1>
        <button 
          @click="router.push('/')"
          class="text-sm px-4 py-2 border border-gray-700 rounded-lg hover:bg-blue-800 transition"
        >
          Back to Home
        </button>
      </div>

      <div class=" border border-blue-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden hover:border-blue-500">
        <div class="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full"></div>
        <h2 class="text-sm tracking-widest text-blue-400 font-bold mb-3 flex items-center gap-2">
            Short Summary
        </h2>
        <p class="text-md md:text-xl text-blue-50 leading-relaxed relative z-10">
          {{ summary.summary }}
        </p>
      </div>

      <div>
        <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ion-icon name="layers-outline" class="text-gray-400"></ion-icon> Key Concepts
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div 
            v-for="(topic, index) in summary.main_topics" 
            :key="index"
            class=" border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition"
          >
            <h3 class="text-lg font-semibold text-blue-300 mb-4 border-b border-gray-800 pb-2">
              {{ topic.topic }}
            </h3>
            <ul class="flex flex-col gap-3">
              <li 
                v-for="(point, pIndex) in topic.bullet_points" 
                :key="pIndex"
                class="text-gray-300 text-sm flex items-start gap-2"
              >
                <span class="text-blue-500 mt-0.5">•</span>
                <span class="leading-relaxed">{{ point }}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ion-icon name="book-outline" class="text-gray-400"></ion-icon> Key Terms
        </h2>
        <div class="border border-gray-800 rounded-xl overflow-hidden">
          
          <div 
            v-for="(term, index) in summary.key_terms" 
            :key="index"
            class="flex flex-col md:flex-row border-b border-gray-800 last:border-0"
          >
            <div class="md:w-1/3 p-3 md:p-5 bg-gray-950/50 text-blue-200 font-medium md:border-r border-gray-800">
              {{ term.word }}
            </div>
            <div class="md:w-2/3 p-3 md:p-5 text-gray-300 text-sm md:text-base leading-relaxed">
              {{ term.type }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface KeyTerm {
  word: string;
  type: string;
}

interface MainTopic {
  topic: string;
  bullet_points: string[];
}

interface SummaryData {
  summary: string;
  key_terms: KeyTerm[];
  main_topics: MainTopic[];
  test_yourself: string;
}

const summary = ref<SummaryData | null>(null);

onMounted(() => {

  const savedData = localStorage.getItem('generatedSummary');
  
  if (savedData) {
    try {
      summary.value = JSON.parse(savedData);
    } catch (err) {
      console.error('Failed to parse summary from localStorage:', err);
    }
  }
});
</script>