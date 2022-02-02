export function truncate(value: string, limit: number) {
  if (!value) {
    return '';
  }
  if (value.length > limit) {
    value = value.substring(0, limit).trim() + '...';
  }
  return value;
}
