import { createReducer, on } from "@ngrx/store";
import { initialQuizSlice } from "./quiz.slice";
import { userActions } from "../user.actions";
import { serverActions } from "../server.actions";

export const quizReducer = createReducer(initialQuizSlice, 
    on(userActions.reset, () => initialQuizSlice), 
    on(userActions.answerCurrentQuestion, (state, action) => ({
        ...state,
        answers: [...state.answers, action.userAnswer]
    })), 
    on(userActions.generateQuiz, state => ({
        ...state,
        isBusy: true
    })), 
    on(serverActions.newQuizGenerated, (state, action) => ({
        ...state, 
        questions: action.questions,
        answers: [],
        isBusy: false
    }))
);