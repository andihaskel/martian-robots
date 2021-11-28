import { martianRobots } from '../app/martian-robots';
jest.useFakeTimers('legacy');
describe('Martian Robots', () => {
  it('should move successfully', (done) => {
    const res = martianRobots({ x: 5, y: 3 }, '1 1 E', 'RFRFRFRF');

    expect(res).toBe('X: 1 Y: 1 orientation E');
    done();
  });

  it('should get lost', (done) => {
    const res = martianRobots(
      { x: 5, y: 3 },
      '3 2 N',
      'FRRFLLFFRRFLL',
    );

    expect(res).toBe('X: 3 Y: 3 orientation LOST');
    done();
  });

  it('should smell scent and not fall', (done) => {
    martianRobots({ x: 5, y: 3 }, '3 2 N', 'FRRFLLFFRRFLL');
    const res = martianRobots({ x: 5, y: 3 }, '0 3 W', 'LLFFFLFLFL');

    expect(res).toBe('X: 2 Y: 3 orientation S');
    done();
  });

  it('should get lost because coordinates are out of mars', (done) => {
    const res = martianRobots(
      { x: 5, y: 3 },
      '-1 -1 W',
      'LLFFFLFLFL',
    );

    expect(res).toBe('X: -1 Y: -1 orientation LOST');
    done();
  });

  it('should fail because initial position is invalid', (done) => {
    expect(() =>
      martianRobots({ x: 5, y: 3 }, '-1 -1', 'LLFFFLFLFL'),
    ).toThrowError();
    done();
  });

  it('should fail because orientation is invalid', (done) => {
    expect(() =>
      martianRobots({ x: 5, y: 3 }, '-1 -1 J', 'LLFFFLFLFL'),
    ).toThrowError();
    done();
  });
});
