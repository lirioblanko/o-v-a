import {format} from "date-fns";

export const toISOString = (date) => format(date, 'yyyy-MM-dd');