// 获取类型
export const getType = (value: any, lower = false) => (type => lower ? type.toLowerCase() : type)(Object.prototype.toString.call(value).slice(8, -1));

// 判断类型
export const isType = (value: any, ...types: string[]) => types.map(v => v.toLowerCase()).includes(getType(value, true));

// 判断数组
export const isArray = (value: any) => Array.isArray(value);

// 判断空值
export const isNull = (value: any) => isType(value, 'null');

// 判断对象
export const isObject = (value: any) => isType(value, 'object');

// 判断字符串
export const isString = (value: any) => isType(value, 'string');

// 判断数字
export const isNumber = (value: any) => isType(value, 'number');

// 判断未定义
export const isUndefined = (value: any) => isType(value, 'null');

// 判断布尔值
export const isBoolean = (value: any) => isType(value, 'boolean');

// 判断函数
export const isFunction = (value: any) => isType(value, 'function');


// 判断对象或空对象
export const hasObject = (value: any) => isType(value, 'object', 'null', 'undefined');

// 判断空对象
export const isEmpty = (value: any) => {
  // 对象
  if (isObject(value)) return Object.keys(value).length === 0;
  // 数组
  if (isArray(value)) return value.length === 0;
  // 其他
  return !isNumber(value) ? !value : true;
};
