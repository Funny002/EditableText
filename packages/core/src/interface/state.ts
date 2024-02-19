import { ExtendedTypes, OmitFirstArg } from '../utils';
import { EventListener } from '@editable-text/utils';
import { NodeTransforms } from './transforms';
import { Operation } from './operation';
import { Descendant } from './node';

export interface BaseState extends StateListener<StateListenerType> {
  children: Descendant[];
  // core
  apply: (operation: Operation) => void;
  //
  insert: OmitFirstArg<typeof NodeTransforms.insert>;
}


export interface StateListener<T extends StateListenerType> {
  listener: EventListener<T>;
  on: EventListener<T>['on'];
  off: EventListener<T>['off'];
  once: EventListener<T>['once'];
  emit: EventListener<T>['emit'];
}

export type StateListenerType = string;

export type State = ExtendedTypes<'State', BaseState>
