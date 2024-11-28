import { createReducer } from "@ngrx/store";
import { initialQuizSlice } from "./quiz.slice";

export const quizReducer = createReducer(initialQuizSlice);