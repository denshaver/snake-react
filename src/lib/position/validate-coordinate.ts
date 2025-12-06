export const validateCoordinate = (coordinate: number, maxPosition: number) => {
  if (coordinate > maxPosition) {
    return 1;
  } else if (coordinate < 1) {
    return maxPosition;
  }
  return coordinate;
};
