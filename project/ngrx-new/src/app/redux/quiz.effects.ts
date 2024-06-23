import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ColorQuizGeneratorService } from "../services/color-quiz-generator.service";
import { userActions } from "./user.actions";
import { exhaustAll, filter, map, mergeAll } from "rxjs";
import { serviceActions } from "./service.actions";

export const generateQuizEffect = createEffect(() => {
    const actions$ = inject(Actions);
    const service = inject(ColorQuizGeneratorService);

    const res$ = actions$.pipe(
        ofType(userActions.generateNewQuiz),
        map(_ => service.createRandomQuiz()), 
        exhaustAll(), 
        map(qs => serviceActions.quizGenerated({questions: qs}))
    );

    return res$;

}, {functional: true})