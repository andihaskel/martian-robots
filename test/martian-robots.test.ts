import { MartianRobots } from '../app/martian-robots';
jest.useFakeTimers('legacy');
describe('Martian Robots', () => {
  const martianRobots = new MartianRobots();

  it('should move successfully', (done) => {
    const res = martianRobots.getRobotsFinalCoordinates({ x: 5, y: 3 }, [
      { position: '1 1 E', instruction: 'RFRFRFRF' },
    ]);

    expect(res[0]).toBe('1 1 E');
    done();
  });

  it('should get lost', (done) => {
    const res = martianRobots.getRobotsFinalCoordinates({ x: 5, y: 3 }, [
      { position: '3 2 N', instruction: 'FRRFLLFFRRFLL' },
    ]);

    expect(res[0]).toBe('3 3 N LOST');
    done();
  });

  it('should smell scent and not fall', (done) => {
    const res = martianRobots.getRobotsFinalCoordinates({ x: 5, y: 3 }, [
      { position: '3 2 N', instruction: 'FRRFLLFFRRFLL' },
      { position: '0 3 W', instruction: 'LLFFFLFLFL' },
    ]);

    const [, secondRobot] = res;
    expect(secondRobot).toBe('2 3 S');
    done();
  });

  it('should not be able to move forward because initial coordinates are out of mars', (done) => {
    const res = martianRobots.getRobotsFinalCoordinates({ x: 5, y: 3 }, [
      { position: '-1 -1 W', instruction: 'FFFLFLFL' },
    ]);

    expect(res[0]).toBe('-1 -1 W LOST');
    done();
  });

  it('should fail because initial position input is invalid', (done) => {
    expect(() =>
      martianRobots.getRobotsFinalCoordinates({ x: 5, y: 3 }, [
        { position: '-1 -1', instruction: 'LLFFFLFLFL' },
      ]),
    ).toThrowError('Invalid initial position input. Missing parameters');
    done();
  });

  it('should fail because orientation is invalid', (done) => {
    expect(() =>
      martianRobots.getRobotsFinalCoordinates({ x: 5, y: 3 }, [
        { position: '1 1 J', instruction: 'LLFFFLFLFL' },
      ]),
    ).toThrowError('invalid Orientation');
    done();
  });

  it('should fail because contains an invalid instruction', (done) => {
    expect(() =>
      martianRobots.getRobotsFinalCoordinates({ x: 5, y: 3 }, [
        { position: '1 1 E', instruction: 'G' },
      ]),
    ).toThrowError('invalid instruction');
    done();
  });
});
