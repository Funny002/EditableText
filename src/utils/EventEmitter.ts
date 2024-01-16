type EventEmitterHandler = (...args: any[]) => void;

/**
 * EventEmitter 事件监听器
 */
export class EventEmitter {
  // 事件目标对象，用于存储事件类型和对应的事件处理函数数组
  protected target: Record<string, EventEmitterHandler[]> = {};

  /**
   * 触发事件
   * @param type 事件类型
   * @param args 传递给事件处理函数的参数
   */
  emit(type: string, ...args: any[]) {
    // 如果目标对象中没有该事件类型，则直接返回
    if (!this.target[type]) return;
    // 遍历事件处理函数数组，并调用每个函数处理事件
    this.target[type].forEach((handler) => handler(...args));
  }

  /**
   * 绑定事件监听器
   * @param type 事件类型
   * @param handler 事件处理函数
   */
  on(type: string, handler: EventEmitterHandler) {
    // 如果目标对象中没有该事件类型，则先创建一个空数组
    if (!this.target[type]) this.target[type] = [];
    // 将事件处理函数添加到事件类型对应的数组中
    this.target[type].push(handler);
  }

  /**
   * 解绑事件监听器
   * @param type 事件类型
   * @param handler 事件处理函数
   */
  off(type: string, handler: EventEmitterHandler) {
    // 如果目标对象中没有该事件类型，则直接返回
    if (!this.target[type]) return;
    // 遍历事件处理函数数组，将指定的事件处理函数从数组中移除
    this.target[type] = this.target[type].filter((h) => h !== handler);
  }

  /**
   * 绑定一次性事件监听器
   * @param type 事件类型
   * @param handler 事件处理函数
   */
  once(type: string, handler: EventEmitterHandler) {
    // 创建一个匿名函数，用于执行一次性事件处理
    const fn = (...args: any[]) => {
      handler(...args);
      // 在事件处理完成后解绑该匿名函数
      this.off(type, fn);
    };
    // 将匿名函数作为事件处理函数绑定到事件监听器上
    this.on(type, fn);
  }
}

/**
 *  全局事件监听器
 */
export default new EventEmitter();
