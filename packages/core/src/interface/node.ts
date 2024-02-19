import { ExtendedTypes } from '../utils';
import { State } from './state';

// 文本类型
export interface BaseText {
  text: string;
}

// 文本类型
export type Text = ExtendedTypes<'Text', BaseText>;

// 元素类型
export interface BaseElement {
  children: Descendant[];
}

// 元素类型
export type Element = ExtendedTypes<'Element', BaseElement>;

// 描述符类型
export type Descendant = Text | Element;

// 节点类型
export type Node = State | Descendant;
