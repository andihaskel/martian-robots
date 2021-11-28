import * as types from './types';

const orientationMapper: types.OrientationMapper = {
  R: {
    N: 'E',
    E: 'S',
    S: 'W',
    W: 'N',
  },
  L: {
    N: 'W',
    W: 'S',
    S: 'E',
    E: 'N',
  },
};

export const orientate = (
  currentOrientation: string,
  instruction: string,
): string => orientationMapper[instruction][currentOrientation];

export const fallOfMars = (
  currentX: number,
  currentY: number,
  upperRightCoordinates: types.Coordinates,
  currentOrientation: string,
): boolean => {
  const { x: worldLimitX, y: worldLimitY } = upperRightCoordinates;

  const simulatedCoordinates = getMovementCoordinates(
    currentX,
    currentY,
    currentOrientation,
  );
  const { x: simulatedX, y: simulatedY } = simulatedCoordinates;
  if (
    simulatedX > worldLimitX ||
    simulatedY > worldLimitY ||
    simulatedX < 0 ||
    simulatedY < 0
  ) {
    return true;
  }
  return false;
};

export const getMovementCoordinates = (
  currentX: number,
  currentY: number,
  currentOrientation: string,
): types.Coordinates => {
  let coordinates: types.MovementMapper = {
    N: () => ({ x: currentX, y: currentY + 1 }),
    S: () => ({ x: currentX, y: currentY - 1 }),
    E: () => ({ x: currentX + 1, y: currentY }),
    W: () => ({ x: currentX - 1, y: currentY }),
    default: () => {
      throw new Error('invalid Orientation');
    },
  };
  return coordinates[currentOrientation]();
};

export const hasScent = (
  currentX: number,
  currentY: number,
  scentList: Array<types.Coordinates>,
): types.Coordinates | undefined =>
  scentList.find(
    ({ x, y }: types.Coordinates) => x === currentX && y === currentY,
  );
