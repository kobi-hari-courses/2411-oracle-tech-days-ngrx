import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

export const XStore = signalStore(
    {providedIn: 'root'},   
    withState({ x: 0}), 
    withMethods(store => ({
        inc: () => patchState(store, state => ({ x: state.x + 1 })),
    }))

)