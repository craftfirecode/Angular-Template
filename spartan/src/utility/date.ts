export const formatDateDE = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

export const calendarI18nDE = {
  years: (startYear?: number, endYear?: number): number[] => {
    const start = startYear ?? 1900;
    const end = endYear ?? 2050;
    const years: number[] = [];
    for (let i = start; i <= end; i++) {
      years.push(i);
    }
    return years;
  },

  formatWeekdayName: (index: number): string => {
    const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    return weekdays[index] ?? '';
  },

  formatHeader: (month: number, year: number): string => {
    const months = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    return `${months[month] ?? ''} ${year}`;
  },

  formatMonth: (month: number): string => {
    const months = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    return months[month] ?? '';
  },

  firstDayOfWeek: (): any => 1 // Montag als erster Tag der Woche
} as any;

// Standard-Min/Max-Daten, damit sie zentral verwendbar sind
export const DEFAULT_MIN_DATE = new Date(2023, 0, 1);
export const DEFAULT_MAX_DATE = new Date(2050, 11, 31);
