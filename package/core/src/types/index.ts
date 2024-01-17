export type ExtendableTypes = 'Editor' | 'Element' | 'Text'

export interface CustomTypes {
  [key: string]: unknown;
}

export type ExtendedType<K extends ExtendableTypes, B> = unknown extends CustomTypes[K] ? B : CustomTypes[K];
