import chalk from 'chalk';
import { OsColoredConsole } from '../src/OsColoredConsole';

describe('OsColoredConsole', () => {
  let assertSpy: jasmine.Spy;
  let errorSpy: jasmine.Spy;
  let infoSpy: jasmine.Spy;
  let logSpy: jasmine.Spy;
  let warnSpy: jasmine.Spy;
  let chalkLevel: chalk.Level;

  beforeEach(() => {
    assertSpy = spyOn(console, 'assert');
    errorSpy = spyOn(console, 'error');
    infoSpy = spyOn(console, 'info');
    logSpy = spyOn(console, 'log');
    warnSpy = spyOn(console, 'warn');

    chalkLevel = chalk.level;
    chalk.level = 3;
  });

  afterEach(() => {
    chalk.level = chalkLevel;
  });

  describe('should use the default prefix', () => {
    it('for assert', () => {
      new OsColoredConsole().assert(true, 'message');
      expectMessageIs(assertSpy, 'assert: message', 1);
    });

    it('for error', () => {
      new OsColoredConsole().error('message');
      expectMessageIs(errorSpy, 'error: message');
    });

    it('for info', () => {
      new OsColoredConsole().info('message');
      expectMessageIs(infoSpy, 'message');
    });

    it('for log', () => {
      new OsColoredConsole().log('message');
      expectMessageIs(logSpy, 'message');
    });

    it('for warn', () => {
      new OsColoredConsole().warn('message');
      expectMessageIs(warnSpy, 'warning: message');
    });
  });

  describe('assert', () => {
    it('should call into the system console', () => {
      new OsColoredConsole().assert(true, 'message');
      expect(assertSpy.calls.mostRecent().args[0]).toBeTrue();
      expectMessageMatches(assertSpy, 'message', 1);
      expect(errorSpy).not.toHaveBeenCalled();
      expect(infoSpy).not.toHaveBeenCalled();
      expect(logSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();

      new OsColoredConsole().assert(false, 'message');
      expect(assertSpy.calls.mostRecent().args[0]).toBeFalse();
      expectMessageMatches(assertSpy, 'message', 1);
      expect(errorSpy).not.toHaveBeenCalled();
      expect(infoSpy).not.toHaveBeenCalled();
      expect(logSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should colorize the message in red by default', () => {
      new OsColoredConsole().assert(true, 'message');
      expectRedMessage(assertSpy, 1);
    });
  });

  describe(`error`, () => {
    it(`should call into the system console`, () => {
      new OsColoredConsole().error('message');
      expectMessageMatches(errorSpy, 'message');
      expect(assertSpy).not.toHaveBeenCalled();
      expect(infoSpy).not.toHaveBeenCalled();
      expect(logSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it(`should colorize the message in red by default`, () => {
      new OsColoredConsole().error('message');
      expectRedMessage(errorSpy);
    });
  });

  describe(`info`, () => {
    it(`should call into the system console`, () => {
      new OsColoredConsole().info('message');
      expectMessageMatches(infoSpy, 'message');
      expect(assertSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
      expect(logSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it(`should not colorize the message by default`, () => {
      new OsColoredConsole().info('message');
      expectNoColor(infoSpy);
    });
  });

  describe(`log`, () => {
    it(`should call into the system console`, () => {
      new OsColoredConsole().log('message');
      expectMessageMatches(logSpy, 'message');
      expect(assertSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
      expect(infoSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it(`should not colorize the message by default`, () => {
      new OsColoredConsole().log('message');
      expectNoColor(logSpy);
    });
  });

  describe(`warn`, () => {
    it(`should call into the system console`, () => {
      new OsColoredConsole().warn('message');
      expectMessageMatches(warnSpy, 'message');
      expect(assertSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
      expect(infoSpy).not.toHaveBeenCalled();
      expect(logSpy).not.toHaveBeenCalled();
    });

    it(`should colorize the message in yellow by default`, () => {
      new OsColoredConsole().warn('message');
      expectYellowMessage(warnSpy);
    });
  });

  describe(`success`, () => {
    it(`should call into the system console`, () => {
      new OsColoredConsole().success('message');
      expectMessageMatches(infoSpy, 'message');
      expect(assertSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
      expect(logSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it(`should colorize the message in green by default`, () => {
      new OsColoredConsole().success('message');
      expectGreenMessage(infoSpy);
    });

    it(`should use the default message, 'Success', if not supplied`, () => {
      new OsColoredConsole().success();
      expect(infoSpy).toHaveBeenCalledWith(jasmine.stringMatching('Success'));
    });
  });
});

const stripColors = (message: string): string => message.replace(/\x1b\[\d+m/g, '');

const expectMessageIs = (spy: jasmine.Spy, expected: string, argIndex: number = 0): void => {
  const argument: string = spy.calls.mostRecent().args[argIndex];
  const colorlessArgument: string = stripColors(argument);
  expect(colorlessArgument).toBe(expected);
};

const expectMessageMatches = (spy: jasmine.Spy, expected: string, argIndex: number = 0): void => {
  const argument: string = spy.calls.mostRecent().args[argIndex];
  const colorlessArgument: string = stripColors(argument);
  expect(colorlessArgument).toMatch(new RegExp(`.*${expected}`));
};

const colorEscapeSequenceStart = '\x1b[';
const colorEscapeSequenceEnd = colorEscapeSequenceStart + 39 + 'm';

const expectRedMessage = (spy: jasmine.Spy, argIndex: number = 0): void => {
  const argument: string = spy.calls.mostRecent().args[argIndex];
  expect(argument).toStartWith(colorEscapeSequenceStart + 31 + 'm');
  expect(argument).toEndWith(colorEscapeSequenceEnd);
};

const expectYellowMessage = (spy: jasmine.Spy, argIndex: number = 0): void => {
  const argument: string = spy.calls.mostRecent().args[argIndex];
  expect(argument).toStartWith(colorEscapeSequenceStart + 33 + 'm');
  expect(argument).toEndWith(colorEscapeSequenceEnd);
};

const expectGreenMessage = (spy: jasmine.Spy, argIndex: number = 0): void => {
  const argument: string = spy.calls.mostRecent().args[argIndex];
  expect(argument).toStartWith(colorEscapeSequenceStart + 32 + 'm');
  expect(argument).toEndWith(colorEscapeSequenceEnd);
};

const expectNoColor = (spy: jasmine.Spy, argIndex: number = 0): void => {
  const argument: string = spy.calls.mostRecent().args[argIndex];
  expect(argument).not.toStartWith(colorEscapeSequenceStart);
  expect(argument).not.toEndWith(colorEscapeSequenceEnd);
};
