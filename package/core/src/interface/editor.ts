import { ExtendedType } from '../types';
import { Descendant } from './node.ts';

export interface BaseEditor {
  children: Descendant[];
}

export type Editor = ExtendedType<'Editor', BaseEditor>

export interface EditorInterface {}

export const Editor: EditorInterface = {};
