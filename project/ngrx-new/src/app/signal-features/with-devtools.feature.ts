import { getState, signalStoreFeature, withHooks } from "@ngrx/signals";
import { reduxDevtoolsInit, reduxDevtoolsSend } from "./devtools.helpers";
import { effect } from "@angular/core";

export function withDevtools(instanceName: string) {
    return (store: any) => {
        const session = reduxDevtoolsInit(instanceName, store);
        const feature = signalStoreFeature(
            withHooks(store1 => ({
                onInit: () => {
                    effect(() => {
                        reduxDevtoolsSend(session, {type: 'Action'}, store1);
                    })
                }
            }))
        );

        return feature(store);
    }
}