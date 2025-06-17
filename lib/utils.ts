import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum PROJECT_TYPE {
  ALL = "ALL",
  ARCHITECTURE = "ARCHITECTURE",
  INTERIOR = "INTERIOR",
  PUBLIC_SPACE = "PUBLIC_SPACE",
  PLANNING = "PLANNING",
  RESEARCH_AND_STUDY = "RESEARCH_AND_STUDY",
  ACHIEVEMENTS = "ACHIEVEMENTS",
  OTHER = "OTHER",
}



export const isAdmin = () => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
};
