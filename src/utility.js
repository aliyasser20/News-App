// ? Imports //
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths
} from "date-fns";
// ? End of Imports //

export function ageCalc(date) {
  const currentDate = new Date(Date.now());

  const year = date.slice(0, 4);
  const month = Number(date.slice(5, 7)) - 1;
  const day = date.slice(8, 10);
  const hour = date.slice(11, 13);
  const minute = date.slice(14, 16);

  const comparedDate = new Date(Date.UTC(year, month, day, hour, minute, 0));

  const ageInMins = differenceInMinutes(currentDate, comparedDate);
  const ageInHours = differenceInHours(currentDate, comparedDate);
  const ageInDays = differenceInDays(currentDate, comparedDate);
  const ageInMonths = differenceInMonths(currentDate, comparedDate);

  if (ageInMins < 60) {
    if (ageInMins === 1) {
      return `${ageInMins} minute ago`;
    }
    return `${ageInMins} minutes ago`;
  }
  if (ageInHours < 24) {
    if (ageInHours === 1) {
      return `${ageInHours} hour ago`;
    }
    return `${ageInHours} hours ago`;
  }
  if (ageInDays < 30) {
    if (ageInDays === 1) {
      return `${ageInDays} day ago`;
    }
    return `${ageInDays} days ago`;
  }
  if (ageInMonths === 1) {
    return `${ageInMonths} month ago`;
  }
  return `${ageInMonths} months ago`;
}

export function maxCharactersApply(string, MAXCHARACTERS) {
  if (string.length > MAXCHARACTERS) {
    return `${string.slice(0, MAXCHARACTERS)}...`;
  }
  return string;
}
