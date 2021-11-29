import * as types from './types';

let currentX: number;
let currentY: number;
let currentOrientation: string;
const scentList: Array<types.Coordinates> = [];

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

export const getRobotsFinalCoordinates = (
  upperRightCoordinates: types.Coordinates,
  initialPositionsAndInstructions: Array<types.initialPositionsAndInstructions>,
) => {
  const robotsFinalCoordinates = [];
  for (let i = 0; i < initialPositionsAndInstructions.length; i++) {
    const finalCoordinate = getSingleRobotFinalCoordinates(
      upperRightCoordinates,
      initialPositionsAndInstructions[i].position,
      initialPositionsAndInstructions[i].instruction,
    );
    robotsFinalCoordinates.push(finalCoordinate);
  }
  return robotsFinalCoordinates;
};

const getSingleRobotFinalCoordinates = (
  upperRightCoordinates: types.Coordinates,
  initialPosition: string,
  instructions: string,
): string => {
  let stopReadingInstructions = false;
  currentX = parseInt(initialPosition.split(' ')[0], 10);
  currentY = parseInt(initialPosition.split(' ')[1], 10);
  currentOrientation = initialPosition.split(' ')[2];
  enum instructionTypes {
    Right = 'R',
    Left = 'L',
    Forward = 'F',
  }

  if (currentOrientation == null || currentX == null || currentY == null) {
    throw new Error('Invalid initial position input. Missing parameters');
  }

  for (const instruction of instructions.split('')) {
    switch (instruction) {
      case instructionTypes.Right:
      case instructionTypes.Left:
        orientate(currentOrientation, instruction);
        break;
      case instructionTypes.Forward:
        moveForward(upperRightCoordinates, scentList);
        if (currentOrientation.includes('LOST')) stopReadingInstructions = true;
        break;

      default:
        throw new Error('invalid instruction');
    }
    if (stopReadingInstructions) break;
  }

  return `${currentX} ${currentY} ${currentOrientation}`;
};

const orientate = (orientationToOrientate: string, instruction: string): void => {
  currentOrientation = orientationMapper[instruction][orientationToOrientate];
};

const isMovingOutOfBounds = (
  currentX: number,
  currentY: number,
  upperRightCoordinates: types.Coordinates,
  currentOrientation: string,
): boolean => {
  const { x: worldLimitX, y: worldLimitY } = upperRightCoordinates;

  const simulatedCoordinates = getMovementCoordinates(currentX, currentY, currentOrientation);
  const { x: simulatedX, y: simulatedY } = simulatedCoordinates;
  if (simulatedX > worldLimitX || simulatedY > worldLimitY || simulatedX < 0 || simulatedY < 0) {
    return true;
  }
  return false;
};

const getMovementCoordinates = (
  currentX: number,
  currentY: number,
  currentOrientation: string,
): types.Coordinates => {
  const coordinates: types.MovementMapper = {
    N: () => ({ x: currentX, y: currentY + 1 }),
    S: () => ({ x: currentX, y: currentY - 1 }),
    E: () => ({ x: currentX + 1, y: currentY }),
    W: () => ({ x: currentX - 1, y: currentY }),
    default: () => {
      throw new Error('invalid Orientation');
    },
  };
  if (!Object.keys(coordinates).includes(currentOrientation)) coordinates.default();
  return coordinates[currentOrientation]();
};

const hasScent = (
  currentX: number,
  currentY: number,
  scentList: Array<types.Coordinates>,
): types.Coordinates | undefined => scentList.find(({ x, y }: types.Coordinates) => x === currentX && y === currentY);

const moveForward = (
  upperRightCoordinates: types.Coordinates,
  scentList: Array<types.Coordinates>,
): void => {
  if (isMovingOutOfBounds(currentX, currentY, upperRightCoordinates, currentOrientation)) {
    if (!hasScent(currentX, currentY, scentList)) {
      scentList.push({ x: currentX, y: currentY });
      currentOrientation = `${currentOrientation} LOST`;
    }
  } else {
    const coordinates = getMovementCoordinates(currentX, currentY, currentOrientation);
    currentX = coordinates?.x;
    currentY = coordinates?.y;
  }
};
