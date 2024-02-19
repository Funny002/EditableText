// 随机UUID
export const randUUID = (format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') => format.replace(/[xy]/g, c => (r => (c === 'x' ? r : (r & 0x3) | 0x8).toString(16))((Math.random() * 16) | 0));

// 随机字符 0-9 A-z
export const randString = (str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') => str.charAt(Math.floor(Math.random() * str.length));

// 随机字符串
export const randStrLong = (long = 10) => Array.from({ length: long }).map(() => randString()).join('');

// 随机整数
export const randInt = (min = 0, max = 100) => Math.floor(Math.random() * (max - min) + min);

// 随机字符 ascii[min,max]
export const randChar = (min = 32, max = 126) => String.fromCharCode(randInt(min, max));

// 随机小写字母
export const randLowerChar = () => randChar(97, 122);

// 随机大写字母
export const randUpperChar = () => randChar(65, 90);

// 随机数字
export const randNumber = () => randInt(0, 9);
