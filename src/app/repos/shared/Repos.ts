import { Repo } from './Repo';

export interface Repos {
  isLoading: boolean;
  repos: Repo[];
  hasError: boolean;
}
