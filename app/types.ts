type Coordinates = {
  x: number;
  y: number;
};

type Orientation = 'R' | 'L';

type MovementMapper = {
  [key in string]: Function;
};

type OrientationMapper = {
  [key in string]: {
    [key in string]: string;
  };
};

export {
  Coordinates,
  Orientation,
  MovementMapper,
  OrientationMapper,
};
