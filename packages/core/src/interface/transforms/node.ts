import { State } from '../state.ts';

export interface NodeTransforms {
  insert: (state: State, ...args: any[]) => void;
}

export const NodeTransforms: NodeTransforms = {
  insert(state: State, ...args: any[]) {
    state.insert(...args);
  },
};