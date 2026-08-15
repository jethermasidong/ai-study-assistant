<template>
  <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">

    <div v-if="questions.length === 0" class="text-center">
      <ion-icon name="alert-circle-outline" class="text-6xl text-gray-500 mb-4"></ion-icon>
      <h2 class="text-xl text-gray-300 font-semibold mb-2">No exam found</h2>
      <p class="text-sm text-gray-500 mb-6">Please upload a document to generate an exam first.</p>
      <button 
        @click="router.push('/upload-page')" 
        class="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition cursor-pointer font-medium"
      >
        Back to Upload
      </button>
    </div>


    <div v-else-if="!isSubmitted" class="w-full max-w-xl">
        
        <div class="flex justify-between items-center mb-6 px-2 -mt-20">
            <h1 class="text-2xl font-bold text-white">Practice Exam</h1>
            <span class="text-sm font-mono text-gray-400 border border-gray-50 px-3 py-1 rounded-full">
                Question {{ currentIndex + 1 }} of {{ totalQuestions }}
            </span>
        </div>

        <div class="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-10 shadow-2xl min-h-57.5 flex flex-col relative">
            <span class="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-2 block">
                {{ currentQuestion.type === 'multiple_choice' ? 'Multiple Choice' : 'Identification' }}
            </span>
            <h2 class="text-xl md:text-xl font-medium leading-relaxed mb-8">
                {{ currentQuestion.question }}
            </h2>

            <div v-if="currentQuestion.type === 'multiple_choice'" class="flex flex-col gap-3 mt-auto">
                <button 
                    v-for="(choice, index) in currentQuestion.choices" 
                    :key="index"
                    @click="selectChoice(choice)"
                    class="w-full text-left px-5 py-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-3"
                    :class="answers[currentIndex] === choice 
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-md shadow-blue-500/10' 
                    : 'border-gray-700 bg-black text-gray-300 hover:border-gray-500 hover:bg-gray-800/60'"
                >
                    <div 
                    class="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-semibold shrink-0"
                    :class="answers[currentIndex] === choice 
                        ? 'border-blue-500 bg-blue-500 text-white' 
                        : 'border-gray-600 text-gray-400'"
                    >
                    {{ String.fromCharCode(65 + index) }}
                    </div>
                    <span>{{ choice }}</span>
                </button>
            </div>

            <div v-else-if="currentQuestion.type === 'identification'" class="mt-auto border-t border-gray-800 pt-8">
                <label class="text-sm text-gray-400 mb-2 block">Type your answer below:</label>
                <input 
                    v-model="answers[currentIndex]"
                    type="text" 
                    placeholder="Enter your answer..."
                    class="w-full bg-black border border-gray-600 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
            </div>

           <div class="flex justify-between items-center mt-6">
                <button 
                    @click="prevQuestion"
                    :disabled="currentIndex === 0"
                    class="px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
                    :class="currentIndex === 0 
                        ? 'opacity-40 text-gray-600 cursor-not-allowed' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/80 cursor-pointer'"
                >
                    <ion-icon name="arrow-back-outline"></ion-icon> 
                    Previous
                </button>
                
                <button 
                    v-if="currentIndex < totalQuestions - 1"
                    @click="nextQuestion"
                    class="px-7 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer"
                >
                    Next 
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>

                <button 
                v-else
                    @click="submitExam"
                    class="px-7 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                    Submit Exam 
                    <ion-icon name="checkmark-done-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    <div v-else class="w-full max-w-md text-center">
        <div class="bg-white/10 border border-gray-700 rounded-2xl p-10 shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
            
            <ion-icon v-if="(score / totalQuestions * 100) > 50 " name="trophy-outline" class="text-6xl text-blue-500 mb-4 relative z-10"></ion-icon>
            <ion-icon v-else="(score / totalQuestions * 100) < 50 " name="sad-outline" class="text-6xl text-gray-500 mb-4 relative z-10"></ion-icon>
            <h2 class="text-2xl font-bold text-white mb-6 relative z-10">Exam Complete!</h2>
            
            <div class="text-7xl font-extrabold text-blue-400 mb-2 relative z-10">
                {{ score }}<span class="text-3xl text-gray-500">/{{ totalQuestions }}</span>
            </div>
            
            <p class="text-lg text-gray-400 font-medium mb-8 relative z-10">
                {{ Math.round((score / totalQuestions) * 100) || 0 }}% Accuracy
            </p>

            <div class="flex flex-col gap-3 relative z-10">
                
                <button 
                    @click="retryExam" 
                    class="w-full py-3 bg-gray-800 border border-gray-600 hover:bg-gray-700 text-white rounded-xl transition cursor-pointer font-bold flex items-center justify-center gap-2"
                >
                    <ion-icon name="refresh-outline"></ion-icon> Try Again
                </button>

                <button 
                    @click="router.push('/')" 
                    class="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition cursor-pointer font-bold flex items-center justify-center gap-2"
                >
                    <ion-icon name="home-outline"></ion-icon> Back to Home
                </button>
                
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();


interface Question {
    question: String;
    type: 'multiple_choice' | 'identification';
    choices?: string[];
    correctAnswer: string;
    explanation?: string;
}

const questions = ref<Question[]>([]);
const currentIndex = ref(0);
const answers = ref<Record<number, string>>({});
const isSubmitted = ref(false);
const score = ref(0);

onMounted(() => {
    const savedData = localStorage.getItem('generatedExam');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            questions.value = parsed.questions || parsed || [];
        } catch (err) {
            console.error('Failed to parse exam questions from localstorage:', err);
        }
    } 
});

const totalQuestions = computed(() => questions.value.length);
const currentQuestion = computed(() => questions.value[currentIndex.value] || {} as Question);

const selectChoice = (choice: string) => {
    answers.value[currentIndex.value] = choice;
};

const nextQuestion = () => {
    if (currentIndex.value < totalQuestions.value -1) {
        currentIndex.value++;
    }
};

const prevQuestion = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    }
};

const submitExam = () => {
    let currentScore = 0;

    questions.value.forEach((question, index) => {
        const userAnswer = answers.value[index] || "";

        if (question.type === 'multiple_choice') {
            if (userAnswer === question.correctAnswer) {
                currentScore++;
            }
        }
        else if (question.type === 'identification') {

            const normalizedUserAnswer = userAnswer.trim().toLowerCase();
            const normalizedCorrectAnswer = question.correctAnswer.trim().toLowerCase();
            if (normalizedUserAnswer === normalizedCorrectAnswer) {
                currentScore++;
            }
        }
    });

    score.value = currentScore;
    isSubmitted.value = true;
};

const retryExam = () => {
    currentIndex.value = 0;
    answers.value = {};
    isSubmitted.value = false;
    score.value = 0;
};

</script>