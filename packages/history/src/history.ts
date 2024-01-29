import { formatDate, limitSize } from '@editable-text/utils';

export class HistoryItem<T> {
  private target: T;
  private readonly __t: number;
  private __isSave: boolean = false;

  constructor(value: T) {
    this.target = value;
    this.__t = Date.now();
    // 取消枚举
    Object.defineProperty(this, '__t', { enumerable: false });
    Object.defineProperty(this, 'target', { enumerable: false });
    Object.defineProperty(this, '__isSave', { enumerable: false });
  }

  // 是否存在修改
  get isSave() {
    return this.__isSave;
  }

  // 获取时间
  get time() {
    return this.__t;
  }

  // 获取内容
  get value() {
    return this.target;
  }

  // 改变内容
  set value(value: T) {
    this.target = value;
    this.__isSave = true;
  }

  // 时间格式化
  timeFormat(format: string) {
    return formatDate(format, this.__t);
  }
}

export class History<T extends any> {
  // 索引
  private index: number;
  // 最大长度
  private maxSize: number;
  // 数据
  private target: HistoryItem<T>[] = [];

  constructor(maxIndex?: number) {
    this.index = -1;
    this.target = [];
    this.maxSize = maxIndex || 0;
    // 取消枚举
    Object.defineProperty(this, 'keys', { enumerable: false });
    Object.defineProperty(this, 'target', { enumerable: false });
  }

  // 改变索引
  setIndex(index: number) {
    this.index = limitSize(index, 0, this.target.length - 1);
  }

  // 改变长度
  setMaxSize(maxSize: number) {
    this.maxSize = limitSize(maxSize, 0, Infinity);
  }

  // 获取内容
  get data(): HistoryItem<T> | undefined {
    return this.target[this.index];
  }

  // 添加
  push(value: T) {
    const { index, maxSize } = this;
    const long = this.target.length;

    // 添加
    this.target.splice(index + 1, long - index - 1, new HistoryItem(value));

    // 裁剪
    if (maxSize && long > maxSize) {
      this.target.splice(0, long - maxSize);
    }

    // 设置索引
    this.index = this.target.length - 1;
  }

  // 撤回
  undo() {
    if (this.index > 0) {
      return this.index--;
    }
    return 0;
  }

  // 重做
  redo() {
    if (this.index < this.target.length - 1) {
      return this.index++;
    }
    return this.index;
  }

  // 重置
  reset() {
    this.index = -1;
    this.target = [];
  }
}
