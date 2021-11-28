import {
  fallOfMars,
  getMovementCoordinates,
  hasScent,
  orientate,
} from './helper';
import { Coordinates } from './interfaces';

let currentX: number;
let currentY: number;
let currentOrientation: string;
let scentList: Array<Coordinates> = [];

export const martianRobots = (
  upperRightCoordinates: Coordinates,
  initialPosition: string,
  instructions: string,
) => {
  let stopReadingInstructions = false;
  currentX = parseInt(initialPosition.split(' ')[0], 10);
  currentY = parseInt(initialPosition.split(' ')[1], 10);
  currentOrientation = initialPosition.split(' ')[2];

  console.log('X: ', currentX);
  console.log('Y: ', currentY);
  console.log('currentOrientation: ', currentOrientation);

  for (let instruction of instructions.split('')) {
    console.log('INSTRUCTION', instruction);
    switch (instruction) {
      case 'R':
      case 'L':
        currentOrientation = orientate(
          currentOrientation,
          instruction,
        );
        console.log('ORIENTATE', currentOrientation);
        break;
      case 'F':
        if (
          fallOfMars(
            currentX,
            currentY,
            upperRightCoordinates,
            currentOrientation,
          )
        ) {
          console.log('FALL FROM MARS');
          if (!hasScent(currentX, currentY, scentList)) {
            scentList.push({ x: currentX, y: currentY });
            currentOrientation = 'LOST';
            stopReadingInstructions = true;
            console.log('NOT HAVE SCENT');
          }
        } else {
          console.log('DONT FALL FROM MARS');
          const coordinates = getMovementCoordinates(
            currentX,
            currentY,
            currentOrientation,
          );
          currentX = coordinates.x;
          currentY = coordinates.y;
          console.log('NEW COORDINATES: ', coordinates);
          console.log('X: ', currentX);
          console.log('Y: ', currentY);
        }
        break;
      // console.log(`x: ${currentX} y: ${currentY}`);
    }
    if (stopReadingInstructions) break;
  }
  console.log(
    `x: ${currentX} y: ${currentY} orientation ${currentOrientation}`,
  );
  return `X: ${currentX} Y: ${currentY} orientation ${currentOrientation}`;
};

martianRobots({ x: 5, y: 3 }, '1 1 E', 'RFRFRFRF');
martianRobots({ x: 5, y: 3 }, '3 2 N', 'FRRFLLFFRRFLL');
martianRobots({ x: 5, y: 3 }, '0 3 W', 'LLFFFLFLFL');
