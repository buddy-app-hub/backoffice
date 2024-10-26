import moment from "moment";

export const DateFormatter = {
  toShortDate: (date: Date | string | null | undefined): string => {
    if (!date) return '-';

    return moment(date).format('DD/MM/YYYY');
  },

  isDateInPast: (date: Date, today: Date = new Date()): boolean => {
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const comparisonDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    return comparisonDate < currentDate;
  }
}
