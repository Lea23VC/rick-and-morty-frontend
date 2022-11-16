export function calculatePage(prev: number | null, next: number | null) {
  if (prev == null) {
    return 1;
  }
  if (prev == null && next == null) {
    return 1;
  }
  if (next == null) {
    return prev + 1;
  }

  return next - 1;
}
