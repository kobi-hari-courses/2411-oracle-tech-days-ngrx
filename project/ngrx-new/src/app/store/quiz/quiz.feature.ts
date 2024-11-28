import { createFeature, createSelector } from "@ngrx/store";
import { quizReducer } from "./quiz.reducer";
import { getCorrectCount } from "./quiz.helpers";

export const quizFeature = createFeature({
    name: "quiz",
    reducer: quizReducer, 
    extraSelectors: selectors => {
        const selectCurrentQuestionIndex =  createSelector(selectors.selectAnswers, answers => answers.length);
        const selectCurrentQuestion = createSelector(selectors.selectQuestions, selectCurrentQuestionIndex,
            (questions, index) => questions[index]);
        const selectQuestionsCount = createSelector(selectors.selectQuestions, 
            questions => questions.length);
        const selectIsDone = createSelector(selectCurrentQuestionIndex, selectQuestionsCount, 
            (currentIndex, count) => currentIndex >= count
        )
        const selectCorrectAnswers = createSelector(selectors.selectAnswers, selectors.selectQuestions, 
            getCorrectCount)
        
        return {
            selectCurrentQuestionIndex, 
            selectCurrentQuestion, 
            selectQuestionsCount, 
            selectIsDone, 
            selectCorrectAnswers
        }
    } 
});

