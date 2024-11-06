import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string): string {
  const names = fullName.trim().split(" ");
  // Check if there's at least a first name and a last name
  if (names.length < 2) {
    throw new Error("Please provide both a first name and a last name.");
  }

  const firstNameInitial = names[0][0].toUpperCase();
  const lastNameInitial = names[names.length - 1][0].toUpperCase();

  return `${firstNameInitial}${lastNameInitial}`;
}
