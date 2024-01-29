import { Create, BaseEditor } from '@editable-text/core';
import { EventHandler } from '@editable-text/utils';

export interface EditableOptions {
  // 初始值
  value?: any;
  // 插件
  plugins?: any[];
  // 只读
  readOnly?: boolean;
  // 最大长度
  maxLength?: number;
  // 自动聚焦
  autoFocus?: boolean;
  // 占位符
  placeholder?: string;
}

export class Editable {
  private readonly editor: HTMLElement;
  private manage: BaseEditor;

  constructor(selectors: HTMLElement | string, options: EditableOptions) {
    if (typeof selectors === 'string') {
      const dom = document.querySelector<HTMLElement>(selectors);
      if (!dom) throw new Error('No element found with selector: ' + selectors);
      selectors = dom;
    }
    this.manage = Create();
    this.editor = selectors;
    this.addPlugins(...(options.plugins || []));
    console.log(this.editor, options, this.manage);
  }

  addPlugins(...plugins: any[]) {
    for (const plugin of plugins) {
      this.manage = plugin(this.manage);
    }
  }

  on(type: string, handler: EventHandler) {
    this.manage.on(type, handler);
  }

  off(type: string, handler: EventHandler) {
    this.manage.off(type, handler);
  }

  once(type: string, handler: EventHandler) {
    this.manage.once(type, handler);
  }

  setValue() {

  }

  toHtml() {

  }

  toJson() {

  }
}
