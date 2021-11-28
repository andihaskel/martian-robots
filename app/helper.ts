import { Coordinates } from './interfaces';

const orientationMapper: any = {
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
): any => orientationMapper[instruction][currentOrientation];

export const fallOfMars = (
  currentX: number,
  currentY: number,
  upperRightCoordinates: Coordinates,
  currentOrientation: string,
) => {
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
): any => {
  let coordinates;
  switch (currentOrientation) {
    case 'N':
      coordinates = { x: currentX, y: currentY + 1 };
      break;
    case 'S':
      coordinates = { x: currentX, y: currentY - 1 };
      break;
    case 'E':
      coordinates = { x: currentX + 1, y: currentY };
      break;
    case 'W':
      coordinates = { x: currentX - 1, y: currentY };
      break;
  }
  return coordinates;
};

export const hasScent = (
  currentX: number,
  currentY: number,
  scentList: Array<Coordinates>,
) =>
  scentList.find(
    ({ x, y }: Coordinates) => x === currentX && y === currentY,
  );

// const movementMapper: any = {
//   N: () => (currentY += 1),
//   S: () => (currentY -= 1),
//   E: () => (currentX -= 1),
//   W: () => (currentX += 1),
// };

// const move = (currentOrientation: string): any =>
//   movementMapper[currentOrientation]();
