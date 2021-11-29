type Coordinates = {
  x: number;
  y: number;
};

type MovementMapper = {
  [key in string]: Function;
};

type InstructionOptions = {
  [key in string]: Function;
};

type OrientationMapper = {
  [key in string]: {
    [key in string]: string;
  };
};

type initialPositionsAndInstructions = {
  instruction: string;
  position: string;
};

export {
  Coordinates,
  MovementMapper,
  OrientationMapper,
  InstructionOptions,
  initialPositionsAndInstructions,
};
