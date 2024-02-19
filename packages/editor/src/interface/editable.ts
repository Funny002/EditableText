import { State, StateListener, StateListenerType } from '@editable-text/core';
import { ExtendedTypes } from '../utils';

export interface BaseEditable extends StateListener<EditableListenerType | StateListenerType> {
  state: State;
  dom: { root: HTMLElement, body: HTMLElement, toolbar: null | { dom: HTMLElement, menu: any[] | null } };
}

export type Editable = ExtendedTypes<'Editable', BaseEditable>

export type EditableListenerType = 'init'
