import { addMinutes, format } from 'date-fns';

export function makeFilterDateForDay(forDate: Date): [Date, Date] {
  const start = new Date(forDate);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(forDate);
  end.setUTCHours(23, 59, 59, 999);

  return [start, end];
}

export function startOfDay(date: Date) {
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  return start;
}

export function formattedTime(date: Date | string) {
  return format(new Date(date), 'HH:mm');
}

export function formatDateTime(date: string | Date) {
  return format(new Date(date), "dd MMM yyyy 'om' HH:mm");
}

export function formatDateTimeSec(date: string | Date) {
  return format(new Date(date), "dd MMM yyyy 'at' HH:mm:ss");
}

export function formatDate(date: string | Date) {
  return format(new Date(date), 'EEE, dd MMM yyyy');
}

export function addMinutesToDate(date: Date, minutes: number) {
  return addMinutes(date, minutes);
}

export function parseOrderDate(date: string) {
  return new Date(date);
}
