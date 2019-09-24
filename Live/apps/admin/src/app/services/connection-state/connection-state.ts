import { LifecycleState } from "./lifecycle-state";

export interface ConnectionState {
  online: boolean;
  lifecycleState: LifecycleState;
}
