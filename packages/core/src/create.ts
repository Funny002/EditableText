import { EventListener } from '@editable-text/utils';
import { State } from './interface';
import { insert } from './state';
import { apply } from './core';

export function createState() {
  const listener = new EventListener();
  const state: State = {
    children: [],
    // Core
    apply: (operation) => apply(state, operation),

    // Listener
    listener: listener,
    on: (...args) => listener.on(...args),
    off: (...args) => listener.off(...args),
    once: (...args) => listener.once(...args),
    emit: (...args) => listener.emit(...args),

    // State
    insert: (...args) => insert(state, ...args),
  };
  //
  return state;
}
