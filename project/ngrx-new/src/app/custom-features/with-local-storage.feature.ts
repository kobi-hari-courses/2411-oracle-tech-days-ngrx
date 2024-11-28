import { effect } from "@angular/core";
import { getState, patchState, signalStoreFeature, withHooks } from "@ngrx/signals";

export function withLocalStorage(key: string) {
    return signalStoreFeature(
        withHooks(store => ({
            onInit: () => {
                const text = localStorage.getItem(key);
                if (text) {
                    const state = JSON.parse(text);
                    patchState(store, state);
                }
    
                effect(() => {
                    const state = getState(store);
                    const text = JSON.stringify(state);
                    localStorage.setItem(key, text);
                });
            }
    
        }))

    );
}