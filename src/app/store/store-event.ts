import { State } from './store.service';

export abstract class StoreEvent {
  constructor(public payload?: any) {};

  abstract getNewState(state: State): State;
}
