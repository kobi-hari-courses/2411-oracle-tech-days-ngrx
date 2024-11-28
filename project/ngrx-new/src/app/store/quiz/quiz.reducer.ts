import { createReducer, on } from "@ngrx/store";
import { initialQuizSlice } from "./quiz.slice";
import { userActions } from "../user.actions";

export const quizReducer = createReducer(initialQuizSlice, 
    on(userActions.reset, () => initialQuizSlice), 
    on(userActions.answerCurrentQuestion, (state, action) => ({
        ...state,
        answers: [...state.answers, action.userAnswer]
    }))
);