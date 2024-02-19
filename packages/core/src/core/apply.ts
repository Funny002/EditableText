import { Operation, State } from '../interface';

export const apply = (state: State, operation: Operation) => {
  const { emit } = state;
  console.log('apply', state, operation, emit);
};
