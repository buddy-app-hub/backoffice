import moment from "moment";

export const DateFormatter = {
  toShortDate: (date: Date | string | null | undefined): string => {
    if (!date) return '-';

    return moment(date).format('DD/MM/YYYY');
  },
}
