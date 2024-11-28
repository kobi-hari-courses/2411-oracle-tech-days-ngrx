import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { userActions } from "../user.actions";
import { ColorQuizGeneratorService } from "../../services/color-quiz-generator.service";
import { exhaustAll, map } from "rxjs";
import { serverActions } from "../server.actions";

export const generateQuizEffect = createEffect(() => {
    const api = inject(ColorQuizGeneratorService);
    const res$ = inject(Actions).pipe(
        ofType(userActions.generateQuiz),
        map(() => api.createRandomQuiz()), 
        exhaustAll(), 
        map(questions => serverActions.newQuizGenerated({questions}))
    );    
    return res$;
}
 , {
    functional: true
});