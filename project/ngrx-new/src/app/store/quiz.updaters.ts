import { QuizSlice } from "./quiz.slice";

export function addAnswer(userAnswer: number) {
    return (state: QuizSlice) => ({
        answers: [...state.answers, userAnswer]
    })
}