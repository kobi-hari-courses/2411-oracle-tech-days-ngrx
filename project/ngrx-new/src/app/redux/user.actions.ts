import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const userActions = createActionGroup({
    source: 'USER', 
    events: {
        'reset': emptyProps(), 
        'answer current question': props<{userAnswer: number}>()
    }
})
