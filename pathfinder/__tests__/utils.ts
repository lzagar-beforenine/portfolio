export function convertToGrid(input: string): string[] {
  const grid = input.split('\n');
  return grid.slice(1, -1);
}
