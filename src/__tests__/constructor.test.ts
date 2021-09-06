import { NodeLogger } from '../index';
test('Constructor all OK check', () => {
  expect(
    (() => {
      try {
        new NodeLogger();
      } catch (e) {
        return e;
      }
      return 'Ok';
    })(),
  ).toBe('Ok');
});
