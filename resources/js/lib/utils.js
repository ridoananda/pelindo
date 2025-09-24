import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function untuk menggabungkan class names dengan Tailwind CSS
 * Menggunakan clsx untuk conditional classes dan tailwind-merge untuk menghindari konflik
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
