import { computed, effect, inject } from "@angular/core";
import { QUESTIONS } from "../data/questions";
import { QuizState } from "../models/quiz-state.model";
import { signalStore, withComputed, withState, withMethods, 
         patchState, withHooks, getState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { ColorQuizGeneratorService } from "../services/color-quiz-generator.service";
import { catchError, exhaustAll, map, of, tap } from "rxjs";
import { withConsistency } from "../signal-features/with-consistency.feature";
import { withDevtools } from "../signal-features/with-devtools.feature";
import { withBusy } from "../signal-features/with-busy.feature";
import { XStore } from "./x.store";

export const initialQuizState: QuizState = {
    questions: QUESTIONS, 
    answers: []
};

export const QuizStore = signalStore(
    { providedIn: 'root'},
    withDevtools('Quiz Store'),
    withState(initialQuizState), 
    withBusy(),
    withComputed((store, xStore = inject(XStore)) => ({
        indexOfCurrentQuestion: computed(() => store.answers().length), 
        questionsCount: computed(() => store.questions().length),
        isDone: computed(() => store.answers().length === store.questions().length), 
        correctCount: computed(() => store.answers().filter(answer => answer.isCorrect).length),  
        scoreX: computed(() => xStore.x() + store.answers().length)
    })), 
    withComputed(store => ({
        currentQuestion: computed(() => store.questions()[store.indexOfCurrentQuestion()]), 
    })), 
    withMethods((store, service = inject(ColorQuizGeneratorService)) => ({
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
        generateNewQuiz: rxMethod<void>(trigger$ => trigger$.pipe(
            tap(() => store.startBusy()),
            map(() => service.createRandomQuiz().pipe(
                tap({
                    error: e => console.error(e)
                }), 
                catchError(() => of())
            )), 
            exhaustAll(),
            tap(_ => store.stopBusy()),
            tap(qs => patchState(store, { questions: qs, answers: [] }))
        ))
    })),
    withConsistency('quiz-state'), 
);
