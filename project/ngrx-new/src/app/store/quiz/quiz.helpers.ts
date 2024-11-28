import { Question } from "../../models/question.model";

export function getCorrectCount(answers: number[], questions: Question[]) {
    let correct = 0;

    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === questions[i].correctIndex) {
            correct++;
        }
    }

    return correct;
}