import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const userActions = createActionGroup({
    source: 'User', 
    events: {
        'reset': emptyProps(), 
        'answer current question': props<{userAnswer: number}>(), 
        'generate quiz': emptyProps(),  
    }
});

