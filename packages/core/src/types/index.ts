import { Editor } from '../interface';

export type ExtendableTypes = 'Editor' | 'Element' | 'Text' | 'Operation'

export interface CustomTypes {
  [key: string]: unknown;
}

export type ExtendedType<K extends ExtendableTypes, B> = unknown extends CustomTypes[K] ? B : CustomTypes[K];

export type OmitFirst<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

export type WithEditorFirst<T extends (...args: any) => any> = (editor: Editor, ...args: Parameters<T>) => ReturnType<T>;
