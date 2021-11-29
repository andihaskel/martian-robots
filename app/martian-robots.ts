import {
  fallOfMars,
  getMovementCoordinates,
  hasScent,
  orientate,
} from './helper';
import { Coordinates } from './types';

let currentX: number;
let currentY: number;
let currentOrientation: string;
let scentList: Array<Coordinates> = [];

enum instructionTypes {
  right = 'R',
  left = 'L',
  forward = 'F',
}

export const martianRobots = (
  upperRightCoordinates: Coordinates,
  initialPosition: string,
  instructions: string,
): string => {
  let stopReadingInstructions = false;
  currentX = parseInt(initialPosition.split(' ')[0], 10);
  currentY = parseInt(initialPosition.split(' ')[1], 10);
  currentOrientation = initialPosition.split(' ')[2];

  if (
    currentOrientation == null ||
    currentX == null ||
    currentY == null
  ) {
    throw new Error('Invalid initial position input');
  }

  for (let instruction of instructions.split('')) {
    switch (instruction) {
      case instructionTypes.right:
      case instructionTypes.left:
        currentOrientation = orientate(
          currentOrientation,
          instruction,
        );
        break;
      case instructionTypes.forward:
        if (
          fallOfMars(
            currentX,
            currentY,
            upperRightCoordinates,
            currentOrientation,
          )
        ) {
          if (!hasScent(currentX, currentY, scentList)) {
            scentList.push({ x: currentX, y: currentY });
            currentOrientation = 'LOST';
            stopReadingInstructions = true;
          }
        } else {
          const coordinates = getMovementCoordinates(
            currentX,
            currentY,
            currentOrientation,
          );
          currentX = coordinates?.x;
          currentY = coordinates?.y;
        }
        break;
    }
    if (stopReadingInstructions) break;
  }

  return `X: ${currentX} Y: ${currentY} orientation ${currentOrientation}`;
};
