import { State } from '../interface/state.ts';

export function insert(state: State, ...args: any[]) {
  console.log('insert', state, args);
}
