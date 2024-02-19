import { Editable, EditorOptions } from './interface';
import { createState } from '@editable-text/core';
import { initialize } from './editor';
import './style/index.css';

export function createEditable(selectors: HTMLElement | string, options: EditorOptions) {
  if (typeof selectors === 'string') {
    const dom = document.querySelector<HTMLElement>(selectors);
    if (!dom) throw new Error('No element found with selector: ' + selectors);
    selectors = dom;
  }
  const defaultValue = selectors.innerHTML;
  selectors.classList.add('editable');
  selectors.innerHTML = '';
  //
  const state = createState();
  //
  const editor: Editable = {
    state: state,
    listener: state.listener,
    dom: initialize(selectors, options),
    on: (...args) => state.on(...args),
    off: (...args) => state.off(...args),
    once: (...args) => state.once(...args),
    emit: (...args) => state.emit(...args),
  };
  //
  console.log(defaultValue);
  // editor.setValue(defaultValue);
  return editor;
}
