type Coordinates = {
  x: number;
  y: number;
};

type Orientation = 'R' | 'L';
type Direction = 'N' | 'E' | 'S' | 'W' | 'default';
type MovementCoordinates = {
  [key in Direction]: () => Coordinates | Error;
};

export { Coordinates, Orientation, Direction, MovementCoordinates };
