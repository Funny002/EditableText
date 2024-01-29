export function limitSize(value: number, min = 0, max = Infinity) {
  return Math.max(Math.min(value, max), min);
}
