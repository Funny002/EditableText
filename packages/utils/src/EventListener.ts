export type EventListenerType = string;

export type EventHandler = (...args: any[]) => void;

export class EventListener<T extends EventListenerType> {
  target: { [key: string]: EventHandler[] } = Object.create(null);

  // 触发事件
  emit(type: T, ...args: any[]) {
    const handlers = this.target[type] || [];
    for (const handler of handlers) {
      handler(...args);
    }
  }

  // 添加事件监听
  on(type: T, handler: EventHandler) {
    if (!this.target[type]) this.target[type] = [];
    this.target[type].push(handler);
  }

  // 移除事件监听
  off(type: T, handler: EventHandler) {
    if (this.target[type]) {
      const index = this.target[type].indexOf(handler);
      if (index > -1) {
        this.target[type].splice(index, 1);
      }
    }
  }

  // 添加事件监听 - 一次性
  once(type: T, handler: EventHandler) {
    const listener = (...args: any[]) => {
      this.off(type, listener);
      handler(...args);
    };
    this.on(type, listener);
  }
}
