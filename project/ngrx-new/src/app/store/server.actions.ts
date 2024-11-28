import { createActionGroup, props } from "@ngrx/store";
import { Question } from "../models/question.model";

export const serverActions = createActionGroup({
    source: 'Server',
    events: {
        'new quiz generated': props<{questions: Question[]}>(),
        'new quiz failed': props<{error: string}>(),
    }
});