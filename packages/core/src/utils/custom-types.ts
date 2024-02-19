// 自定义类
export type CustomTypes = { [key: string]: unknown; }

// 可扩展的类型
export type ExtendableTypes = 'State' | 'Element' | 'Text' | 'Operation'

// 扩展类型
export type ExtendedTypes<K extends ExtendableTypes, B> = unknown extends CustomTypes[K] ? B : CustomTypes[K];
