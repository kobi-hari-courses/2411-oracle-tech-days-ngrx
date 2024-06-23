import { createReducer, on } from "@ngrx/store";
import { initialQuizState } from "./quiz.state";
import { userActions } from "./user.actions";
import { currentQuestionFromState } from "./quiz.helpers";
import { serviceActions } from "./service.actions";
import { Statement } from "@angular/compiler";

export const quizReducer = createReducer(initialQuizState, 
    on(userActions.reset, () => initialQuizState), 
    on(userActions.answerCurrentQuestion, (state, action) => ({
        ...state, 
        answers: [...state.answers, {
            userAnswer: action.userAnswer, 
            isCorrect: currentQuestionFromState(state).correctIndex === action.userAnswer
        }]
    })), 
    on(serviceActions.quizGenerated, (state, action) => ({
        ...state, 
        questions: action.questions, 
        answers: []
    }))
);