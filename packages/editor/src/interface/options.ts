export type ToolBarOptions = string | Element | {
  selectors: string | Element;
  menu: string | Array<string> | Array<Array<string>>;
}

export interface EditorOptions {
  // 只读
  readOnly?: boolean;
  // 最大长度
  maxLength?: number;
  // 自动聚焦
  autoFocus?: boolean;
  // 占位符
  placeholder?: string;
  //
  toolbar?: ToolBarOptions;
}