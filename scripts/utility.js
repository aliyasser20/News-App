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

  const ageInMins = Math.abs(differenceInMinutes(currentDate, comparedDate));
  const ageInHours = Math.abs(differenceInHours(currentDate, comparedDate));
  const ageInDays = Math.abs(differenceInDays(currentDate, comparedDate));
  const ageInMonths = Math.abs(differenceInMonths(currentDate, comparedDate));

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
  if (ageInDays < 31) {
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

export function imageAvailability(imageURL) {
  if (imageURL === null || imageURL.length < 10 || imageURL === undefined) {
    return "https://gfsstore.com/wp-content/uploads/2018/09/No_Image_Available.png";
  }
  return imageURL;
}

export async function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
