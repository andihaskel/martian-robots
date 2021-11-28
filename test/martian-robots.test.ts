import { martianRobots } from '../app/martian-robots';

describe('Martian Robots', () => {
  it('should be ok', async (done) => {
    const res = martianRobots({ x: 5, y: 3 }, '1 1 E', 'RFRFRFRF');

    expect(res).toBe('X: 1 Y: 1 orientation E');
  });

  it('should be lost', async (done) => {
    const res = martianRobots(
      { x: 5, y: 3 },
      '3 2 N',
      'FRRFLLFFRRFLL',
    );

    expect(res).toBe('X: 3 Y: 3 orientation LOST');
  });

  it('should smell scent and not fall', async (done) => {
    const res = martianRobots({ x: 5, y: 3 }, '0 3 W', 'LLFFFLFLFL');

    expect(res).toBe('X: 2 Y: 3 orientation S');
  });
});
