type Coordinates = {
  x: number;
  y: number;
};

type MovementMapper = {
  [key in string]: Function;
};

type OrientationMapper = {
  [key in string]: {
    [key in string]: string;
  };
};

export { Coordinates, MovementMapper, OrientationMapper };
