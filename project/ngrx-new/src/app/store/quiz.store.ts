import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialQuizSlice } from "./quiz.slice";
import { computed, effect, inject } from "@angular/core";
import { addAnswer } from "./quiz.updaters";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { exhaustAll, map, tap } from "rxjs";
import { ColorQuizGeneratorService } from "../services/color-quiz-generator.service";
import { withLocalStorage } from "../custom-features/with-local-storage.feature";
import { withDevtools } from "@angular-architects/ngrx-toolkit";

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
    withMethods(store => {
        const generator = inject(ColorQuizGeneratorService);
        return {
            reset: () => {
                patchState(store, initialQuizSlice);
            },
            answerCurrentQuestion: (userAnswer: number) => {
                patchState(store, addAnswer(userAnswer));
            }, 
            generate: rxMethod<void>(trigger$ => trigger$.pipe(
                tap(_ => patchState(store, {isBusy: true})), 
                map(_ => generator.createRandomQuiz()), 
                exhaustAll(), 
                tap(questions => patchState(store, {
                    questions, 
                    answers:[], 
                    isBusy: false
                }))

            ))
        }
    }),
    withLocalStorage('quiz'), 
    withDevtools('my-quiz')
);