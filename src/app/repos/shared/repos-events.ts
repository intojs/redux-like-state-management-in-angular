import { StoreEvent } from '../../store/store-event';
import { State } from '../../store/store.service';
import { Repo } from './Repo';

export class GetReposEvent extends StoreEvent {

  getNewState(state: State) {
    return {
      ...state,
      repos: {
        isLoading: true,
        repos: [],
        hasError: false
      }
    };
  }
}

export class GetReposSuccessEvent extends StoreEvent {

  constructor(payload: Repo[]) {
    super(payload);
  }

  getNewState(state: State) {
    return {
      ...state,
      repos: {
        isLoading: false,
        repos: this.payload,
        hasError: false
      }
    };
  }
}

export class GetReposErrorEvent extends StoreEvent {

  getNewState(state: State) {
    return {
      ...state,
      repos: {
        ...state.repos,
        isLoading: false,
        hasError: true
      }
    };
  }
}

