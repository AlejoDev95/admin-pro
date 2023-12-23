export const validateIsNaN = (value: unknown): boolean =>
  !Number.isNaN(Number(`${value}`));

export const assingQueryValue = (
  value: unknown,
  defaultValue: number
): number => (validateIsNaN(value) ? Number(value) : defaultValue);
