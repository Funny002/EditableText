import { ExtendedType } from '../types';
import { Descendant } from './node.ts';

export interface BaseElement {
  children: Descendant[];
}

export type Element = ExtendedType<'Element', BaseElement>

export interface ElementInterface {

}

export const Element: ElementInterface = {};
