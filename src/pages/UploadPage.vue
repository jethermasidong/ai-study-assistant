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
                Tired of long text and repetitive style of reviewing, try centre for better and efficient way to review.
            </p>
        </div>
        <div class="w-full md:w-1/2 text-center lg:text-left mt-32 border border-gray-100 px-5 py-5 rounded-xl">
            <div 
                class="w-full h-80 flex items-center justify-center border-dashed border-2 rounded-md cursor-pointer transition-all duration-200 hover:shadow-blue-500/70 hover:shadow-lg hover:border-blue-500"
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
            <div class="flex flex-row mt-3">
                <ion-icon  name="information-circle-outline" class="text-2xl"></ion-icon>
                <p class="ml-1 text-sm font-extralight text-gray-300">Choose what you want to generate</p>
            </div>
            <div class="flex flex-row gap-3">
                <button 
                    @click="startGeneratingSummary" 
                    :disabled="!selectedFile"
                    class="w-full border rounded-2xl mt-5 px-1 py-1 transition-colors flex flex-row items-center justify-center gap-2"
                    :class="selectedFile ? 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer' : 'border-gray-600 text-gray-600 cursor-not-allowed'"
                >
                    <ion-icon  name="reader-outline" class="text-xl"></ion-icon>
                    Summary
                </button>
                <button 
                    @click="generateExam" 
                    :disabled="!selectedFile"
                    class="w-full border rounded-2xl mt-5 px-1 py-1 transition-colors flex flex-row items-center justify-center gap-2"
                    :class="selectedFile ? 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer' : 'border-gray-600 text-gray-600 cursor-not-allowed'"
                >
                    <ion-icon  name="rocket-outline" class="text-xl"></ion-icon>
                    Exam
                </button>

                <transition name="fade">
                    <div v-if="isExamModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                    
                    <div class="bg-black/60 border border-gray-700 p-8 rounded-2xl w-full max-w-md shadow-2xl relative">
                        
                        <button @click="closeExamModal" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer">
                            <ion-icon name="close-circle-outline" class="text-3xl"></ion-icon>
                        </button>

                        <div class="flex items-center gap-3 mb-6">
                            <h2 class="text-2xl font-bold text-white">Configure Exam</h2>
                        </div>

                        <p class="text-gray-400 text-sm text-left mb-2">
                            Set up the parameters for your practice exam based on your note: <strong class="text-white">{{ selectedFile?.name }}</strong>.
                        </p>

                        <p class="text-gray-400 text-xs text-left mb-6 font-mono items-center  flex flex-row gap-2">
                            <ion-icon name="information-circle-outline" class="text-xl"></ion-icon>
                            Max of 20 questions only. To be upgraded soon.
                        </p>

                        <div class="space-y-4 mb-8 text-left">
                            <div class="flex flex-col gap-1">
                                <label for="questionCount" class="text-sm text-gray-300">Number of Questions</label>
                                <input id="questionCount" v-model="numQuestions" required type="number" min="1" max="20" placeholder="10" class="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                            </div>
                            <div class="flex flex-col gap-1">
                                <label for="questionDifficulty" class="text-sm text-gray-300 text">Difficulty</label>
                                <select id="questionDifficulty" v-model="difficulty" class="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            <div class="flex flex-col gap-1">
                                <label for="questionType" class="text-sm text-gray-300">Type of Exam</label>
                                <select id="questionType" v-model="examType" class="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                                    <option value="multiple_choice">Multiple Choice</option>
                                    <option value="identification">Identification</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <button @click="closeExamModal" class="flex-1 py-2 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors cursor-pointer">
                                Cancel
                            </button>
                            <button @click="startGeneratingExam" class="flex-1 py-2 rounded-xl border border-gray-600 text-white font-bold hover:bg-blue-800 transition-colors cursor-pointer">
                                Generate
                            </button>
                        </div>
                    </div>
                    </div>
                </transition>

            </div>
            <LoadingModal :show="isLoading" />
        </div>  
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoadingModal from '../components/LoadingModal.vue';
import { generateExamApi } from '../api/generateExamApi.js';
import { useRouter } from 'vue-router';
import { generateSummaryApi } from '@/api/summarizeApi.js';


const router = useRouter();

const isLoading = ref(false);
const isDragging = ref(false);

const isExamModalOpen = ref(false);

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


const startGeneratingSummary = async () => {
    isLoading.value = true;
    if (!selectedFile.value) {
        return;
    }

    try {
        const formData = new FormData();

        formData.append('file', selectedFile.value);

        const response = await generateSummaryApi(formData);
        console.log("Exam successfully generated:", response);

        localStorage.setItem('generatedSummary', JSON.stringify(response.summary));
        router.push('/summary-page');

    } catch (error) {
        console.error("Failed to create summary:", error);
        alert("Failed to generate examination");
    } finally {
        isLoading.value = false;
    }

}




const numQuestions = ref(10);
const difficulty = ref('easy');
const examType = ref('multiple_choice');


const generateExam = () => {
    if (!selectedFile.value) return;
    isExamModalOpen.value = true;
};

const closeExamModal = () => {
    isExamModalOpen.value = false;
};

const startGeneratingExam = async () => {

    isExamModalOpen.value = false;
    isLoading.value = true;

    if (!selectedFile.value) {
        return;
    }

    try {
        
        const formData = new FormData();

        formData.append('file', selectedFile.value);
        formData.append('questionCount', numQuestions.value.toString());
        formData.append('difficulty', difficulty.value);
        formData.append('questionTypes', examType.value);

        const response = await generateExamApi(formData);
        console.log("Exam successfully generated:", response);

        localStorage.setItem('generatedExam', JSON.stringify(response.exam));
        router.push('/examination-page');

    } catch (error) {
        console.error("Failed to create examination:", error);
        alert("Failed to generate examination");
    } finally {
        isLoading.value = false;
    }


};

</script>



<style scoped>
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.2s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }
</style>