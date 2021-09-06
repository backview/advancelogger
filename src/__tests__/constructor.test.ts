import { AdvanceLogger } from '../index';
test('Constructor all OK check', () => {
  expect(
    (() => {
      try {
        new AdvanceLogger();
      } catch (e) {
        return e;
      }
      return 'Ok';
    })(),
  ).toBe('Ok');
});
