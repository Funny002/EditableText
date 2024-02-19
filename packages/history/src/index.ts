import { State } from '@editable-text/core';
import { History } from './history';

export type HistoryState = { history: History<any> } & State;

export default function useHistory(core: HistoryState) {
  core.history = new History();
  return core;
};
