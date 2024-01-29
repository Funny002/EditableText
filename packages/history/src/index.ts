import { History } from './history';
import { BaseEditor } from '@editable-text/core';

export type HistoryEditor = { history: History<any> } & BaseEditor;

export default function useHistory(core: HistoryEditor) {
  core.history = new History();
  return core;
};
