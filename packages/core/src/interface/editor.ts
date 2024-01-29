import { EventHandler, EventListener } from '@editable-text/utils';
import { ExtendedType } from '../types';
import { Operation } from './operation';
import { Descendant } from './node';

// 事件
export interface EditorListener {
  listener: EventListener;

  emit(type: string, ...args: any[]): void;

  on(type: string, handler: EventHandler): void;

  off(type: string, handler: EventHandler): void;

  once(type: string, handler: EventHandler): void;
}

export interface BaseEditor extends EditorListener {
  children: Descendant[];
  apply: (operation: Operation) => void;
}

export type Editor = ExtendedType<'Editor', BaseEditor>

// export interface EditorInterface extends EditorListener {}

// export const Editor: EditorInterface = {
//   listener: new EventListener(),
//   on(type: string, handler: EventHandler) {
//     this.listener.on(type, handler);
//   },
//   off(type: string, handler: EventHandler) {
//     this.listener.off(type, handler);
//   },
//   once(type: string, handler: EventHandler) {
//     this.listener.once(type, handler);
//   },
//   emit(type: string, ...args: any[]) {
//     this.listener.emit(type, ...args);
//   },
// };
