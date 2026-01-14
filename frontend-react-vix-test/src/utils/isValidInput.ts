export const isNotEmpty = (v: string) => v.trim().length > 0;

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const isValidPhone = (v: string) => v.replace(/\D/g, "").length >= 11;

export const isPositiveNumber = (v: number) => v > 0;

export const isValidPercent = (v: number) => v >= 0 && v <= 100;
