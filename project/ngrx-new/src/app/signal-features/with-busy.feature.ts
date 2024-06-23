import { patchState, signalStoreFeature, withMethods, withState } from "@ngrx/signals";

export function withBusy() {
    return signalStoreFeature(
        withState({busy: false}), 
        withMethods(store => ({
            startBusy: () => patchState(store, {busy: true}),
            stopBusy: () => patchState(store, {busy: false})
        }))
    )
}