import { ExtendedType } from '../types';
import { Operation } from './operation';
import { Descendant } from './node';

export interface BaseEditor {
  children: Descendant[];
  apply: (operation: Operation) => void;
}

export type Editor = ExtendedType<'Editor', BaseEditor>

export interface EditorInterface {}

export const Editor: EditorInterface = {};
