import { State } from '../interface/state';

export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never

export type WithStateFirst<T extends (...args: any) => any> = (editor: State, ...args: Parameters<T>) => ReturnType<T>;
