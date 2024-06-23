import { computed, effect } from "@angular/core";
import { QUESTIONS } from "../data/questions";
import { QuizState } from "../models/quiz-state.model";
import { signalStore, withComputed, withState, withMethods, patchState, withHooks, getState } from "@ngrx/signals";

export const initialQuizState: QuizState = {
    questions: QUESTIONS, 
    answers: []
};

export const QuizStore = signalStore(
    { providedIn: 'root'},
    withState(initialQuizState), 
    withComputed(store => ({
        indexOfCurrentQuestion: computed(() => store.answers().length), 
        questionsCount: computed(() => store.questions().length),
        isDone: computed(() => store.answers().length === store.questions().length), 
        correctCount: computed(() => store.answers().filter(answer => answer.isCorrect).length),  
    })), 
    withComputed(store => ({
        currentQuestion: computed(() => store.questions()[store.indexOfCurrentQuestion()]), 
    })), 
    withMethods(store => ({
        reset: () => {
            patchState(store, initialQuizState)
        }, 
        answerCurrentQuestion: (answer: number) => {
            patchState(store, state => ({
                answers: [...state.answers, {
                    userAnswer: answer, 
                    isCorrect: answer === store.currentQuestion().correctIndex
                }]
            }))
        },
    })),
    withHooks(store => ({
        onInit: () => {
            effect(() => {
                console.log(getState(store))
            })
        }
    }))
);