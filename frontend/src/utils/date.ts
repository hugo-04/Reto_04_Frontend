const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export function today(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.slice(0, 10).split('-');
  return `${day}/${month}/${year}`;
}

export function formatDateTime(isoDateTime: string): string {
  const time = isoDateTime.slice(11, 16);
  return time ? `${formatDate(isoDateTime)} ${time}` : formatDate(isoDateTime);
}

export function formatMonthYear(year: number, month: number): string {
  return `${MONTHS[month - 1]} ${year}`;
}
