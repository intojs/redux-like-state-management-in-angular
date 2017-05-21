import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Repos } from '../repos/shared/Repos';

export interface State {
  repos: Repos;
}

const initialState: State = {
  repos: {
    isLoading: false,
    repos: [],
    hasError: false
  }
};

export class Store {
  private store: BehaviorSubject<State> = new BehaviorSubject<State>(initialState);
  private store$: Observable<State> = this.store
    .asObservable()
    .distinctUntilChanged();

  observe(): Observable<State> {
    return this.store$;
  }

  dispatch(event): void {
    this.store.next(event.getNewState(this.store.getValue()));
  }
}
