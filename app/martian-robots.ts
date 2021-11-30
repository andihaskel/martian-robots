import * as types from './types';

enum instructionTypes {
  Right = 'R',
  Left = 'L',
  Forward = 'F',
}
export class MartianRobots {
  private currentX: number;
  private currentY: number;
  private currentOrientation: string;
  private scentList: Array<types.Coordinates> = [];
  private orientationMapper: types.OrientationMapper = {
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

  getRobotsFinalCoordinates = (
    upperRightCoordinates: types.Coordinates,
    initialPositionsAndInstructions: Array<types.initialPositionsAndInstructions>,
  ): Array<string> => {
    const robotsFinalCoordinates = [];
    for (let i = 0; i < initialPositionsAndInstructions.length; i += 1) {
      const finalCoordinates = this.getSingleRobotFinalCoordinates(
        upperRightCoordinates,
        initialPositionsAndInstructions[i].position,
        initialPositionsAndInstructions[i].instruction,
      );
      robotsFinalCoordinates.push(finalCoordinates);
    }
    return robotsFinalCoordinates;
  };

  private getSingleRobotFinalCoordinates = (
    upperRightCoordinates: types.Coordinates,
    initialPosition: string,
    instructions: string,
  ): string => {
    let stopReadingInstructions = false;
    this.currentX = parseInt(initialPosition.split(' ')[0], 10);
    this.currentY = parseInt(initialPosition.split(' ')[1], 10);
    this.currentOrientation = initialPosition.split(' ')[2];

    if (this.currentOrientation == null || this.currentX == null || this.currentY == null) {
      throw new Error('Invalid initial position input. Missing parameters');
    }

    for (const instruction of instructions.split('')) {
      switch (instruction) {
        case instructionTypes.Right:
        case instructionTypes.Left:
          this.orientate(this.currentOrientation, instruction);
          break;
        case instructionTypes.Forward:
          this.moveForward(upperRightCoordinates, this.scentList);
          if (this.currentOrientation.includes('LOST')) stopReadingInstructions = true;
          break;
        default:
          throw new Error('invalid instruction');
      }
      if (stopReadingInstructions) break;
    }

    return `${this.currentX} ${this.currentY} ${this.currentOrientation}`;
  };

  private orientate = (orientationToOrientate: string, instruction: string): void => {
    this.currentOrientation = this.orientationMapper[instruction][orientationToOrientate];
  };

  private isMovingOutOfBounds = (
    currentX: number,
    currentY: number,
    upperRightCoordinates: types.Coordinates,
    currentOrientation: string,
  ): boolean => {
    const { x: worldLimitX, y: worldLimitY } = upperRightCoordinates;

    const simulatedCoordinates = this.getMovementCoordinates(
      currentX,
      currentY,
      currentOrientation,
    );
    const { x: simulatedX, y: simulatedY } = simulatedCoordinates;
    if (simulatedX > worldLimitX || simulatedY > worldLimitY || simulatedX < 0 || simulatedY < 0) {
      return true;
    }
    return false;
  };

  private getMovementCoordinates = (
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

  private hasScent = (
    currentX: number,
    currentY: number,
    scentList: Array<types.Coordinates>,
  ): types.Coordinates | undefined => scentList.find(({ x, y }: types.Coordinates) => x === currentX && y === currentY);

  private moveForward = (
    upperRightCoordinates: types.Coordinates,
    scentList: Array<types.Coordinates>,
  ): void => {
    if (
      this.isMovingOutOfBounds(
        this.currentX,
        this.currentY,
        upperRightCoordinates,
        this.currentOrientation,
      )
    ) {
      if (!this.hasScent(this.currentX, this.currentY, scentList)) {
        scentList.push({ x: this.currentX, y: this.currentY });
        this.currentOrientation = `${this.currentOrientation} LOST`;
      }
    } else {
      const coordinates = this.getMovementCoordinates(
        this.currentX,
        this.currentY,
        this.currentOrientation,
      );
      this.currentX = coordinates?.x;
      this.currentY = coordinates?.y;
    }
  };
}
