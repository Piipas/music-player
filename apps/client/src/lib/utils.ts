import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const milliToTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const formattedMinutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const formattedSeconds = String(totalSeconds % 60).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};
