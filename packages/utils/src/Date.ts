import dayjs from 'dayjs';

export function formatDate(format: string, date?: any) {
  return dayjs(date).format(format);
}
