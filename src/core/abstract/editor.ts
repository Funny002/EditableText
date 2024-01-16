import globalEvent from '../../utils/EventEmitter';
import { PluginFactory } from './plugin';

export interface EditorOptions {
  plugins: PluginFactory[];
  element?: HTMLElement | string;
  on?: { type: string, handler: (event: any) => void }[];
}

export abstract class EditorFactory {
  private editorDom: HTMLElement;

  constructor(options: EditorOptions);
  constructor(element: HTMLElement | string, options: EditorOptions);
  constructor(...args: [HTMLElement | string | EditorOptions, EditorOptions?]) {
    let element = (<EditorOptions>args[0]).element || <HTMLElement | string>args[0] || '';
    if (typeof element === 'string') {
      if (!element) throw new Error('element is not found');
      const dom = document.querySelector<HTMLElement>(element);
      if (!dom) throw new Error('element is not found');
      element = dom;
    }
    this.editorDom = element;
    this.handlerOptions((args[1] || args[0]) as EditorOptions);
  }

  protected handlerOptions(options: EditorOptions) {
    for (const item of options.on || []) {
      this.on(item.type, item.handler);
    }
  }

  on(type: string, handler: (event: any) => void) {
    globalEvent.on(type, handler);
  }

  off(type: string, handler: (event: any) => void) {
    globalEvent.off(type, handler);
  }

  once(type: string, handler: (event: any) => void) {
    globalEvent.once(type, handler);
  }
}
