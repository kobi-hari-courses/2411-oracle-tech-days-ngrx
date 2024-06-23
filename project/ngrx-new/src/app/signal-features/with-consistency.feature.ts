import { effect } from "@angular/core";
import { getState, patchState, signalStoreFeature, withHooks } from "@ngrx/signals";

export function withConsistency(key: string) {
    return signalStoreFeature(
        withHooks(store => ({
            onInit: () => {
                const state = localStorage.getItem(key);
                if (state) {
                    patchState(store, JSON.parse(state))
                }
                effect(() => {
                    localStorage.setItem(key, JSON.stringify(getState(store)))
                })
                }
        }))
    );
}