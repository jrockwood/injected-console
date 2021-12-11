import { Color, LogType, VirtualColoredConsole } from '@jrockwood/injected-console';
import {
  toHaveJustLoggedErrorFactory,
  toHaveJustLoggedFactory,
  toHaveJustLoggedInfoFactory,
  toHaveJustLoggedSuccessFactory,
  toHaveJustLoggedWarningFactory,
  toHaveLineFactory,
} from '../src/JasmineMatchers';

const logFunc = (virtualConsole: VirtualColoredConsole, message: string, foreColor?: Color, backColor?: Color) =>
  virtualConsole.log(message, foreColor, backColor);
const infoFunc = (virtualConsole: VirtualColoredConsole, message: string, foreColor?: Color, backColor?: Color) =>
  virtualConsole.info(message, foreColor, backColor);
const warnFunc = (virtualConsole: VirtualColoredConsole, message: string, foreColor?: Color, backColor?: Color) =>
  virtualConsole.warn(message, foreColor, backColor);
const errorFunc = (virtualConsole: VirtualColoredConsole, message: string, foreColor?: Color, backColor?: Color) =>
  virtualConsole.error(message, foreColor, backColor);
const successFunc = (virtualConsole: VirtualColoredConsole, message: string, foreColor?: Color, backColor?: Color) =>
  virtualConsole.success(message, foreColor, backColor);

describe('JasmineMatchers', () => {
  describe('toHaveJustLogged()', () => {
    runToHaveJustLoggedSuite(toHaveJustLoggedFactory, 'log', logFunc, 'inherit', 'inherit');

    it('should use the expected syntax', () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.log('message');
      expect(virtualConsole).toHaveJustLogged('message');
    });

    it("should use the expected syntax in the 'not' case", () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.log('message');
      expect(virtualConsole).not.toHaveJustLogged('other message');
    });
  });

  describe('toHaveJustLoggedSuccess()', () => {
    runToHaveJustLoggedSuite(toHaveJustLoggedSuccessFactory, 'success', successFunc, 'green', 'inherit');

    it('should use the expected syntax', () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.success('message', 'green');
      expect(virtualConsole).toHaveJustLoggedSuccess('message');
    });

    it("should use the expected syntax in the 'not' case", () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.success('message');
      expect(virtualConsole).not.toHaveJustLoggedSuccess('other message');
    });
  });

  describe('toHaveJustLoggedError()', () => {
    runToHaveJustLoggedSuite(toHaveJustLoggedErrorFactory, 'error', errorFunc, 'red', 'inherit');

    it('should use the expected syntax', () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.error('message', 'red');
      expect(virtualConsole).toHaveJustLoggedError('error: message');
    });

    it("should use the expected syntax in the 'not' case", () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.error('message');
      expect(virtualConsole).not.toHaveJustLoggedError('other message');
    });
  });

  describe('toHaveJustLoggedWarning()', () => {
    runToHaveJustLoggedSuite(toHaveJustLoggedWarningFactory, 'warn', warnFunc, 'yellow', 'inherit');

    it('should use the expected syntax', () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.warn('message', 'yellow');
      expect(virtualConsole).toHaveJustLoggedWarning('warning: message');
    });

    it("should use the expected syntax in the 'not' case", () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.warn('message');
      expect(virtualConsole).not.toHaveJustLoggedWarning('other message');
    });
  });

  describe('toHaveJustLoggedInfo()', () => {
    runToHaveJustLoggedSuite(toHaveJustLoggedInfoFactory, 'info', infoFunc, 'inherit', 'inherit');
  });

  describe('toHaveLine()', () => {
    let virtualConsole: VirtualColoredConsole;
    let matcher: jasmine.CustomMatcher;

    beforeEach(() => {
      virtualConsole = new VirtualColoredConsole({ suppressPrefixes: true });
      matcher = toHaveLineFactory(jasmine.matchersUtil, []);
    });

    it('should return true if there is at least one line when no message is specified', () => {
      virtualConsole.log('message1');
      virtualConsole.log('message2');
      const { pass } = (matcher.compare as MessageFunc)(virtualConsole);
      expect(pass).toBeTrue();
    });

    it('should return true if there is at least one line matching the message exactly', () => {
      virtualConsole.log('message1');
      virtualConsole.log('message2');
      const { pass } = (matcher.compare as MessageFunc)(virtualConsole, 'message2');
      expect(pass).toBeTrue();
    });

    it('should return true if there is at least one line matching the message as a RegExp', () => {
      virtualConsole.log('message1');
      virtualConsole.log('message2');
      const { pass } = (matcher.compare as MessageFunc)(virtualConsole, /message\d/);
      expect(pass).toBeTrue();
    });

    it('should return false if there are no lines', () => {
      const { pass, message } = (matcher.compare as MessageFunc)(virtualConsole);
      expect(pass).toBeFalse();
      expect(message).toBe('Expected the console to have written something, but there are no lines.');
    });

    it('should return false if there are no lines that exactly match the expected message', () => {
      virtualConsole.log('message1');
      virtualConsole.log('message2');
      const { pass, message } = (matcher.compare as MessageFunc)(virtualConsole, 'message3');
      expect(pass).toBeFalse();
      expect(message).toBe("Expected the console to have written 'message3', but there are no matching lines.");
    });

    it('should return false if there are no lines that match the expected RegExp', () => {
      virtualConsole.log('message1');
      virtualConsole.log('message2');
      const { pass, message } = (matcher.compare as MessageFunc)(virtualConsole, /no match/);
      expect(pass).toBeFalse();
      expect(message).toBe('Expected the console to have written /no match/, but there are no matching lines.');
    });

    describe("using 'not'", () => {
      it('should return true if there are no lines', () => {
        const { pass } = (matcher.negativeCompare as MessageFunc)(virtualConsole);
        expect(pass).toBeTrue();
      });

      it('should return true if there are no lines that exactly match the expected message', () => {
        virtualConsole.log('message1');
        virtualConsole.log('message2');
        const { pass } = (matcher.negativeCompare as MessageFunc)(virtualConsole, 'message3');
        expect(pass).toBeTrue();
      });

      it('should return true if there are no lines that match the expected RegExp', () => {
        virtualConsole.log('message1');
        virtualConsole.log('message2');
        const { pass } = (matcher.negativeCompare as MessageFunc)(virtualConsole, /no match/);
        expect(pass).toBeTrue();
      });

      it('should return false if there is at least one line when no message is specified', () => {
        virtualConsole.log('message1');
        virtualConsole.log('message2');
        const { pass, message } = (matcher.negativeCompare as MessageFunc)(virtualConsole);
        expect(pass).toBeFalse();
        expect(message).toBe('Expected the console not to have written any lines, but there are 2 lines.');
      });

      it('should return false if there is at least one line matching the message exactly', () => {
        virtualConsole.log('message1');
        virtualConsole.log('message2');
        const { pass, message } = (matcher.negativeCompare as MessageFunc)(virtualConsole, 'message2');
        expect(pass).toBeFalse();
        expect(message).toBe("Expected the console not to have written 'message2', but it did.");
      });

      it('should return false if there is at least one line matching the message as a RegExp', () => {
        virtualConsole.log('message1');
        virtualConsole.log('message2');
        const { pass, message } = (matcher.negativeCompare as MessageFunc)(virtualConsole, /message\d/);
        expect(pass).toBeFalse();
        expect(message).toBe(
          "Expected the console not to have written a message matching /message\\d/, but it wrote 'message1'.",
        );
      });
    });
  });
});

type FactoryFunc = (
  util: jasmine.MatchersUtil,
  customEqualityTesters: readonly jasmine.CustomEqualityTester[],
) => jasmine.CustomMatcher;

type ConsoleWriteFunc = (
  virtualConsole: VirtualColoredConsole,
  message: string,
  foreColor?: Color,
  backColor?: Color,
) => void;

type MessageFunc = (
  virtualConsole: VirtualColoredConsole,
  expectedMessage?: string | RegExp,
) => jasmine.CustomMatcherResult;

type MessageWithColorsFunc = (
  virtualConsole: VirtualColoredConsole,
  expectedMessage?: string | RegExp,
  ignoreColors?: boolean,
) => jasmine.CustomMatcherResult;

/**
 * Runs the battery of tests for a 'toHaveJustX' type of Jasmine matcher.
 * @param getMatcherFactoryFunc A function that returns the matcher to test.
 * @param positiveType The expected type of logging that should be performed for positive tests.
 * @param positiveWriteFunc The action to perform on the colored console for positive tests.
 * @param positiveForeColor The color of the foreground for positive tests.
 * @param positiveBackColor The color of the background for positive tests.
 */
function runToHaveJustLoggedSuite(
  getMatcherFactoryFunc: FactoryFunc,
  positiveType: LogType,
  positiveWriteFunc: ConsoleWriteFunc,
  positiveForeColor: Color,
  positiveBackColor: Color,
): void {
  let virtualConsole: VirtualColoredConsole;
  let matcher: jasmine.CustomMatcher;
  let negativeType: LogType;
  let negativeWriteFunc: ConsoleWriteFunc;
  let negativeForeColor: Color;
  let negativeBackColor: Color;

  beforeEach(() => {
    virtualConsole = new VirtualColoredConsole({ suppressPrefixes: true });
    matcher = getMatcherFactoryFunc(jasmine.matchersUtil, []);
    negativeType = positiveType === 'warn' ? 'error' : 'warn';
    negativeWriteFunc = positiveWriteFunc === warnFunc ? errorFunc : warnFunc;
    negativeForeColor = positiveForeColor === 'magenta' ? 'cyan' : 'magenta';
    negativeBackColor = positiveBackColor === 'white' ? 'blue' : 'white';
  });

  describe('positive cases', () => {
    it('should return true if there is at least one message and no message specified', () => {
      positiveWriteFunc(virtualConsole, 'message', positiveForeColor, positiveBackColor);
      const { pass } = matcher.compare(virtualConsole);
      expect(pass).toBeTrue();
    });

    it('should return true if the last message matches exactly', () => {
      positiveWriteFunc(virtualConsole, 'message', positiveForeColor, positiveBackColor);
      const { pass } = (matcher.compare as MessageWithColorsFunc)(virtualConsole, 'message');
      expect(pass).toBeTrue();
    });

    it('should return true if the last message matches a RegExp', () => {
      positiveWriteFunc(virtualConsole, 'message 123', positiveForeColor, positiveBackColor);
      const { pass } = (matcher.compare as MessageWithColorsFunc)(virtualConsole, /m.*\d+/);
      expect(pass).toBeTrue();
    });

    it('should return true even if the colors do not match if the ignoreColors flag is on', () => {
      positiveWriteFunc(virtualConsole, 'message', negativeForeColor, negativeBackColor);
      const { pass } = (matcher.compare as MessageWithColorsFunc)(virtualConsole, undefined, true);
      expect(pass).toBeTrue();
    });
  });

  describe('negative cases', () => {
    it('should return false if there are no lines', () => {
      const { pass, message } = (matcher.compare as MessageWithColorsFunc)(virtualConsole);
      expect(pass).toBeFalse();
      expect(message).toBe(`Expected the console to have written something, but there are no lines.`);
    });

    it(`should return false if the last message doesn't match exactly`, () => {
      positiveWriteFunc(virtualConsole, 'message');
      const { pass, message } = (matcher.compare as MessageWithColorsFunc)(virtualConsole, 'something else');
      expect(pass).toBeFalse();
      expect(message).toBe(`Expected the console to have written 'something else', but it wrote 'message'.`);
    });

    it(`should return false if the last message doesn't match a RegExp`, () => {
      positiveWriteFunc(virtualConsole, 'message');
      const { pass, message } = (matcher.compare as MessageWithColorsFunc)(virtualConsole, /mess^/);
      expect(pass).toBeFalse();
      expect(message).toBe(`Expected the console to have written a message matching /mess^/, but it wrote 'message'.`);
    });

    it(`should return false if '${positiveType}' wasn't used`, () => {
      negativeWriteFunc(virtualConsole, 'message');
      const { pass, message } = (matcher.compare as MessageWithColorsFunc)(virtualConsole, 'message');
      expect(pass).toBeFalse();
      expect(message).toMatch(
        new RegExp(
          `Expected the console to have written to one of \\[ .*'${positiveType}'.* \\], but it wrote to '${negativeType}'\\.`,
        ),
      );
    });

    it(`should return false if the foreground color isn't '${positiveForeColor}'`, () => {
      positiveWriteFunc(virtualConsole, 'message', negativeForeColor, positiveBackColor);
      const { pass, message } = (matcher.compare as MessageWithColorsFunc)(virtualConsole, 'message');
      expect(pass).toBeFalse();
      expect(message).toBe(
        `Expected the console to have used '${positiveForeColor}' as the foreground color, but it used '${negativeForeColor}'.`,
      );
    });

    it(`should return false if the background color isn't '${positiveBackColor}'`, () => {
      positiveWriteFunc(virtualConsole, 'message', positiveForeColor, negativeBackColor);
      const { pass, message } = (matcher.compare as MessageWithColorsFunc)(virtualConsole, 'message');
      expect(pass).toBeFalse();
      expect(message).toBe(
        `Expected the console to have used '${positiveBackColor}' as the background color, but it used '${negativeBackColor}'.`,
      );
    });
  });

  describe("using 'not'", () => {
    it('should return true if there are no lines', () => {
      const { pass } = (matcher.negativeCompare as MessageWithColorsFunc)(virtualConsole);
      expect(pass).toBeTrue();
    });

    it('should return true if the last message does not match', () => {
      positiveWriteFunc(virtualConsole, 'message');
      const { pass } = (matcher.negativeCompare as MessageWithColorsFunc)(virtualConsole, 'something else');
      expect(pass).toBeTrue();
    });

    it('should return true if the last message does not match a RegExp', () => {
      positiveWriteFunc(virtualConsole, 'message');
      const { pass } = (matcher.negativeCompare as MessageWithColorsFunc)(virtualConsole, /mess^/);
      expect(pass).toBeTrue();
    });

    it('should return true if ${positiveType} was used', () => {
      negativeWriteFunc(virtualConsole, 'message', negativeForeColor, negativeBackColor);
      const { pass } = (matcher.negativeCompare as MessageWithColorsFunc)(virtualConsole);
      expect(pass).toBeTrue();
    });

    it(`should return true if the foreground and background colors aren't what are specified`, () => {
      negativeWriteFunc(virtualConsole, 'message', negativeForeColor, negativeBackColor);
      const { pass } = (matcher.negativeCompare as MessageWithColorsFunc)(virtualConsole);
      expect(pass).toBeTrue();
    });

    it(`should return true if the colors the expected colors, but ignoreColors is set`, () => {
      negativeWriteFunc(virtualConsole, 'message', positiveForeColor, positiveBackColor);
      const { pass } = (matcher.negativeCompare as MessageWithColorsFunc)(virtualConsole, undefined, true);
      expect(pass).toBeTrue();
    });

    it(`should return false if the last message matches exactly`, () => {
      positiveWriteFunc(virtualConsole, 'message');
      const { pass, message } = (matcher.negativeCompare as MessageWithColorsFunc)(virtualConsole, 'message');
      expect(pass).toBeFalse();
      expect(message).toBe(`Expected the console not to have written 'message', but it did.`);
    });

    it(`should return false if the last message matches a RegExp`, () => {
      positiveWriteFunc(virtualConsole, 'message 123');
      const { pass, message } = (matcher.negativeCompare as MessageWithColorsFunc)(virtualConsole, /m.*\d+/);
      expect(pass).toBeFalse();
      expect(message).toBe(
        `Expected the console not to have written a message matching /m.*\\d+/, but it wrote 'message 123'.`,
      );
    });

    it(`should return false if the last message wrote to '${positiveType}'`, () => {
      positiveWriteFunc(virtualConsole, 'message', negativeForeColor, negativeBackColor);
      const { pass, message } = (matcher.negativeCompare as MessageWithColorsFunc)(virtualConsole);
      expect(pass).toBeFalse();
      expect(message).toMatch(
        new RegExp(`Expected the console not to have written to one of \\[ .*'${positiveType}'.* \\], but it did\\.`),
      );
    });

    it(`should return false if the last message has an expected foreground color of '${positiveForeColor}'`, () => {
      negativeWriteFunc(virtualConsole, 'message', positiveForeColor, negativeBackColor);
      const { pass, message } = (matcher.negativeCompare as MessageWithColorsFunc)(virtualConsole);
      expect(pass).toBeFalse();
      expect(message).toBe(
        `Expected the console not to have used '${positiveForeColor}' as the foreground color, but it did.`,
      );
    });

    it(`should return false if the last message has an expected background color of '${positiveBackColor}'`, () => {
      negativeWriteFunc(virtualConsole, 'message', negativeForeColor, positiveBackColor);
      const { pass, message } = (matcher.negativeCompare as MessageWithColorsFunc)(virtualConsole);
      expect(pass).toBeFalse();
      expect(message).toBe(
        `Expected the console not to have used '${positiveBackColor}' as the background color, but it did.`,
      );
    });
  });
}
