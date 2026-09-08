type ClassValue = string | number | null | undefined | false | ClassValue[];

function flattenClasses(value: ClassValue, acc: string[]) {
  if (!value) return;
  if (Array.isArray(value)) {
    value.forEach((item) => flattenClasses(item, acc));
    return;
  }
  acc.push(String(value));
}

export function cn(...values: ClassValue[]): string {
  const acc: string[] = [];
  values.forEach((value) => flattenClasses(value, acc));
  return acc.join(" ");
}
