import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Fallback function in case of import issues
function fallbackCn(...inputs: ClassValue[]) {
  if (typeof inputs[0] === 'string') {
    return inputs[0];
  }
  return '';
}

// Main utility function with error handling
export function cn(...inputs: ClassValue[]) {
  try {
    return twMerge(clsx(inputs))
  } catch (error) {
    return fallbackCn(...inputs);
  }
}
