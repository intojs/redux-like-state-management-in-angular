import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '../../store/store.service';
import { GetReposErrorEvent, GetReposEvent, GetReposSuccessEvent } from './repos-events';
import { Observable } from 'rxjs/Observable';
import { Repo } from './Repo';

@Injectable()
export class ReposService {
  reposUrl = 'https://api.github.com/users/intojs/repos';

  constructor(private http: Http, private store: Store) {
  }

  getRepos() {
    this.store.dispatch(new GetReposEvent());

    this.http.get(this.reposUrl)
      .delay(1000)
      .map((resp: Response) => resp.json())
      .catch((error: any) => {
        return Observable.throw(error.json().error || 'Server error');
      })
      .subscribe((repos: Repo[]) => {
        this.store.dispatch(new GetReposSuccessEvent(repos));
      }, (error: any) => {
        this.store.dispatch(new GetReposErrorEvent());
      });
  }
}
