import { signalStore, withComputed, withState } from "@ngrx/signals";
import { initialQuizSlice } from "./quiz.slice";
import { computed } from "@angular/core";

export const QuizStore = signalStore(
    {providedIn: 'root'},
    withState(initialQuizSlice), 
    withComputed(store => {
        const currentQuestionIndex = computed(() => 
                store.answers().length);
        const currentQuestion = computed(() => 
                store.questions()[currentQuestionIndex()]);
        return {
            currentQuestionIndex, 
            currentQuestion, 
            questionsCount: computed(() => store.questions().length),
            answersCount: computed(() => store.answers().length),   
        }
    }), 
);