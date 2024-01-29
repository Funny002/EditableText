import { Apply, Editor } from './';
import { EventHandler, EventListener } from '@editable-text/utils';

export const Create = () => {
  const listener = new EventListener();
  //
  const editor: Editor = {
    listener: listener,
    children: [],
    apply: (...args) => Apply(editor, ...args),
    emit(type: string, ...args: any[]) {
      listener.emit(type, ...args);
    },
    on(type: string, handler: EventHandler) {
      listener.on(type, handler);
    },
    off(type: string, handler: EventHandler) {
      listener.off(type, handler);
    },
    once(type: string, handler: EventHandler) {
      listener.once(type, handler);
    },
  };
  return editor;
};
