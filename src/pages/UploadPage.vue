<template>
  <div class="min-h-screen bg-black text-white">
    
    <section class="flex flex-col lg:flex-row max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 items-center gap-12 lg:gap-20">
        
        <div class="w-full lg:w-1/2 text-center lg:text-left mt-30">
            <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
                Upload your notes,<br class="hidden md:block" />
                review and prepare <br class="hidden md:block" />
            </h1>
            <h2 class="text-3xl md:text-5xl tracking-tight text-white leading-tight font-cursive">
                with
            </h2>
            <h1 class="text-3xl md:text-6xl font-extrabold tracking-tight text-white mb-3 leading-tight">
                <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-400">
                Centre
                </span>
            </h1>
            
            <p class="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10">
                An AI-powered study assistant that turns your personal notes into interactive review sessions. Centre will generate custom quizzes or flashcards in seconds to master your material.
            </p>
        </div>
        <div class="w-full md:w-1/2 text-center lg:text-left mt-32 border border-gray-100 px-5 py-5 rounded-xl">
            <div 
                class="w-full h-80 flex items-center justify-center border-dashed border-2 rounded-md cursor-pointer transition-all duration-200 hover:shadow-blue-500/70 hover:shadow-lg"
                :class="isDragging ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/70' : 'border-gray-500'"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
                @click="triggerFileInput"
            >
                <input 
                    type="file" 
                    ref="fileInput" 
                    class="hidden" 
                    accept=".pdf" 
                    @change="handleFileSelect"
                />
                
                <div class="flex flex-col items-center pointer-events-none">
                    <ion-icon  name="document-attach-outline" class="text-7xl"></ion-icon>
                    <h1 v-if="!selectedFile" class="text-sm mt-2" :class="isDragging ? 'text-blue-500' : 'text-white'">Drag and drop your files here, or click to select.</h1>
                    <h1 v-else class="text-sm mt-2 text-blue-400 font-bold border border-blue-100 bg-blue-100/20 rounded-2xl px-2 py-1">
                        {{ selectedFile.name }}
                    </h1>
                    <h2 v-if="!selectedFile" class="text-xs font-extralight mt-1" :class="isDragging ? 'text-blue-400' : 'text-gray-400'">Supported format: PDF only.</h2>
                </div>

            </div>

            <button 
                @click="startUpload" 
                :disabled="!selectedFile"
                class="w-full border rounded-2xl mt-5 px-1 py-1 transition-colors"
                :class="selectedFile ? 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer' : 'border-gray-600 text-gray-600 cursor-not-allowed'"
            >
                Submit
            </button>

            <LoadingModal :show="isLoading" />
        </div>  
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoadingModal from '../components/LoadingModal.vue';


const isLoading = ref(false);

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const file = event.dataTransfer?.files?.[0]; 
  
  if (file) {
    processFile(file);
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (file) {
    processFile(file);
  }
};

const processFile = (file: File) => {
  if (file.type !== 'application/pdf') {
    alert('Please upload a PDF file.');
    return;
  }
  selectedFile.value = file;
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 4000);
};

const startUpload = () => {
  if (!selectedFile.value) return;
  console.log('Uploading:', selectedFile.value.name);
};

</script>