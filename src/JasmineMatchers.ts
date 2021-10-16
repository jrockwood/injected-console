import { LogType } from './ColoredConsole';
import { Color } from './ConsoleColors';
import { ColoredLine, VirtualColoredConsole } from './VirtualColoredConsole';

/**
 * If you add a matcher to this file, make sure to add the definition to the
 * jasmine-matchers-types.d.ts file also.
 */

// Don't invoke beforeEach if we're not running inside of a Jasmine environment.
if (typeof global.beforeEach === 'function') {
  beforeEach(() => {
    jasmine.addMatchers({
      toHaveJustLogged: toHaveJustLoggedFactory,
      toHaveJustLoggedSuccess: toHaveJustLoggedSuccessFactory,
      toHaveJustLoggedError: toHaveJustLoggedErrorFactory,
      toHaveJustLoggedInfo: toHaveJustLoggedInfoFactory,
      toHaveJustLoggedWarning: toHaveJustLoggedWarningFactory,
      toHaveLine: toHaveLineFactory,
    });
  });
}

export function toHaveJustLoggedFactory(
  util: jasmine.MatchersUtil,
  customEqualityTesters: readonly jasmine.CustomEqualityTester[],
): jasmine.CustomMatcher {
  return {
    compare: (
      virtualConsole: VirtualColoredConsole,
      expectedMessage?: string | RegExp,
      ignoreColors: boolean = false,
    ) => {
      const color = ignoreColors ? undefined : 'inherit';
      return compareLastLine({
        util,
        customEqualityTesters,
        virtualConsole,
        expectedMessage,
        expectedTypes: ['log'],
        expectedForeColor: color,
        expectedBackColor: color,
      });
    },
    negativeCompare: (
      virtualConsole: VirtualColoredConsole,
      expectedMessage?: string | RegExp,
      ignoreColors: boolean = false,
    ) => {
      const color = ignoreColors ? undefined : 'inherit';
      return negativeCompareLastLine({
        util,
        customEqualityTesters,
        virtualConsole,
        expectedMessage,
        expectedTypes: ['log'],
        expectedForeColor: color,
        expectedBackColor: color,
      });
    },
  };
}

export function toHaveJustLoggedSuccessFactory(
  util: jasmine.MatchersUtil,
  customEqualityTesters: ReadonlyArray<jasmine.CustomEqualityTester>,
): jasmine.CustomMatcher {
  return {
    compare: (
      virtualConsole: VirtualColoredConsole,
      expectedMessage?: string | RegExp,
      ignoreColors: boolean = false,
    ) => {
      const expectedForeColor = ignoreColors ? undefined : 'green';
      const expectedBackColor = ignoreColors ? undefined : 'inherit';
      return compareLastLine({
        util,
        customEqualityTesters,
        virtualConsole,
        expectedMessage,
        expectedTypes: ['success'],
        expectedForeColor,
        expectedBackColor,
      });
    },
    negativeCompare: (
      virtualConsole: VirtualColoredConsole,
      expectedMessage?: string | RegExp,
      ignoreColors: boolean = false,
    ) => {
      const expectedForeColor = ignoreColors ? undefined : 'green';
      const expectedBackColor = ignoreColors ? undefined : 'inherit';
      return negativeCompareLastLine({
        util,
        customEqualityTesters,
        virtualConsole,
        expectedMessage,
        expectedTypes: ['success'],
        expectedForeColor,
        expectedBackColor,
      });
    },
  };
}

export function toHaveJustLoggedErrorFactory(
  util: jasmine.MatchersUtil,
  customEqualityTesters: ReadonlyArray<jasmine.CustomEqualityTester>,
): jasmine.CustomMatcher {
  return {
    compare: (
      virtualConsole: VirtualColoredConsole,
      expectedMessage?: string | RegExp,
      ignoreColors: boolean = false,
    ) => {
      const expectedForeColor = ignoreColors ? undefined : 'red';
      const expectedBackColor = ignoreColors ? undefined : 'inherit';
      return compareLastLine({
        util,
        customEqualityTesters,
        virtualConsole,
        expectedMessage,
        expectedTypes: ['error'],
        expectedForeColor,
        expectedBackColor,
      });
    },
    negativeCompare: (
      virtualConsole: VirtualColoredConsole,
      expectedMessage?: string | RegExp,
      ignoreColors: boolean = false,
    ) => {
      const expectedForeColor = ignoreColors ? undefined : 'red';
      const expectedBackColor = ignoreColors ? undefined : 'inherit';
      return negativeCompareLastLine({
        util,
        customEqualityTesters,
        virtualConsole,
        expectedMessage,
        expectedTypes: ['error'],
        expectedForeColor,
        expectedBackColor,
      });
    },
  };
}

export function toHaveJustLoggedWarningFactory(
  util: jasmine.MatchersUtil,
  customEqualityTesters: ReadonlyArray<jasmine.CustomEqualityTester>,
): jasmine.CustomMatcher {
  return {
    compare: (
      virtualConsole: VirtualColoredConsole,
      expectedMessage?: string | RegExp,
      ignoreColors: boolean = false,
    ) => {
      const expectedForeColor = ignoreColors ? undefined : 'yellow';
      const expectedBackColor = ignoreColors ? undefined : 'inherit';
      return compareLastLine({
        util,
        customEqualityTesters,
        virtualConsole,
        expectedMessage,
        expectedTypes: ['warn'],
        expectedForeColor,
        expectedBackColor,
      });
    },
    negativeCompare: (
      virtualConsole: VirtualColoredConsole,
      expectedMessage?: string | RegExp,
      ignoreColors: boolean = false,
    ) => {
      const expectedForeColor = ignoreColors ? undefined : 'yellow';
      const expectedBackColor = ignoreColors ? undefined : 'inherit';
      return negativeCompareLastLine({
        util,
        customEqualityTesters,
        virtualConsole,
        expectedMessage,
        expectedTypes: ['warn'],
        expectedForeColor,
        expectedBackColor,
      });
    },
  };
}

export function toHaveJustLoggedInfoFactory(
  util: jasmine.MatchersUtil,
  customEqualityTesters: ReadonlyArray<jasmine.CustomEqualityTester>,
): jasmine.CustomMatcher {
  return {
    compare: (
      virtualConsole: VirtualColoredConsole,
      expectedMessage?: string | RegExp,
      ignoreColors: boolean = false,
    ) => {
      const expectedForeColor = ignoreColors ? undefined : 'inherit';
      const expectedBackColor = ignoreColors ? undefined : 'inherit';
      return compareLastLine({
        util,
        customEqualityTesters,
        virtualConsole,
        expectedMessage,
        expectedTypes: ['info'],
        expectedForeColor,
        expectedBackColor,
      });
    },
    negativeCompare: (
      virtualConsole: VirtualColoredConsole,
      expectedMessage?: string | RegExp,
      ignoreColors: boolean = false,
    ) => {
      const expectedForeColor = ignoreColors ? undefined : 'inherit';
      const expectedBackColor = ignoreColors ? undefined : 'inherit';
      return negativeCompareLastLine({
        util,
        customEqualityTesters,
        virtualConsole,
        expectedMessage,
        expectedTypes: ['info'],
        expectedForeColor,
        expectedBackColor,
      });
    },
  };
}

export function toHaveLineFactory(
  util: jasmine.MatchersUtil,
  customEqualityTesters: readonly jasmine.CustomEqualityTester[],
): jasmine.CustomMatcher {
  return {
    compare: (virtualConsole: VirtualColoredConsole, expectedMessage?: string | RegExp) =>
      compareAnyLine({ util, customEqualityTesters, virtualConsole, expectedMessage }),
    negativeCompare: (virtualConsole: VirtualColoredConsole, expectedMessage?: string | RegExp) =>
      negativeCompareAnyLine({ util, customEqualityTesters, virtualConsole, expectedMessage }),
  };
}

interface ComparisonInfo {
  readonly util: jasmine.MatchersUtil;
  readonly customEqualityTesters: readonly jasmine.CustomEqualityTester[];
  readonly virtualConsole: VirtualColoredConsole;
  readonly expectedMessage?: string | RegExp;
  readonly expectedTypes?: readonly LogType[];
  readonly expectedForeColor?: Color;
  readonly expectedBackColor?: Color;
}

/**
 * Compares all lines against all of the attributes (if specified) until a matching line is found
 * and returns a Jasmine result.
 */
function compareAnyLine(info: ComparisonInfo): jasmine.CustomMatcherResult {
  // look through all of the lines until we find a matching one
  for (const line of info.virtualConsole.lines) {
    const result = compareLine(line, info);
    if (result.pass) {
      return result;
    }
  }

  let message: string;
  if (info.expectedMessage) {
    message = `Expected the console to have written ${jasmine.pp(
      info.expectedMessage,
    )}, but there are no matching lines.`;
  } else {
    message = `Expected the console to have written something, but there are no lines.`;
  }

  return { pass: false, message };
}

/**
 * Compares using a 'not' comparison all lines against all of the attributes (if specified) until a
 * matching line is found and returns a Jasmine result.
 */
function negativeCompareAnyLine(info: ComparisonInfo): jasmine.CustomMatcherResult {
  if (info.virtualConsole.lines.length === 0) {
    return { pass: true, message: '' };
  } else if (!info.expectedMessage) {
    return {
      pass: false,
      message: `Expected the console not to have written any lines, but there are ${info.virtualConsole.lines.length} lines.`,
    };
  }

  // look through all of the lines until we find one that matches (since this is the negative case,
  // a matching line indicates failure)
  for (const line of info.virtualConsole.lines) {
    const result = negativeCompareLine(line, info);
    if (!result.pass) {
      return result;
    }
  }

  return { pass: true, message: '' };
}

/**
 * Compares all of the attributes (if specified) of the last line and returns a Jasmine result.
 */
function compareLastLine(info: ComparisonInfo): jasmine.CustomMatcherResult {
  const lastLine = info.virtualConsole.lines.slice(-1)?.[0];
  return compareLine(lastLine, info);
}

/**
 * Compares using a 'not' comparison all of the attributes (if specified) of a line and returns a Jasmine result.
 */
function negativeCompareLastLine(info: ComparisonInfo): jasmine.CustomMatcherResult {
  const lastLine = info.virtualConsole.lines.slice(-1)?.[0];
  return negativeCompareLine(lastLine, info);
}

/**
 * Compares all of the attributes (if specified) of a line and returns a Jasmine result.
 */
function compareLine(actualLine: ColoredLine | undefined, info: ComparisonInfo): jasmine.CustomMatcherResult {
  let message: string;

  // check that there is at least one line
  if (actualLine === undefined) {
    if (info.expectedMessage) {
      message = `Expected the console to have written ${jasmine.pp(info.expectedMessage)}, but there are no lines.`;
    } else {
      message = `Expected the console to have written something, but there are no lines.`;
    }

    return { pass: false, message };
  }

  // check that the messages match
  if (
    info.expectedMessage &&
    !doMessagesMatch(actualLine.message, info.expectedMessage, info.util, info.customEqualityTesters)
  ) {
    if (typeof info.expectedMessage === 'string') {
      message = `Expected the console to have written ${jasmine.pp(info.expectedMessage)}, but it wrote ${jasmine.pp(
        actualLine.message,
      )}.`;
    } else {
      message = `Expected the console to have written a message matching ${jasmine.pp(
        info.expectedMessage,
      )}, but it wrote ${jasmine.pp(actualLine.message)}.`;
    }

    return { pass: false, message };
  }

  // check that the log types match
  if (info.expectedTypes && !info.expectedTypes.includes(actualLine.type)) {
    message = `Expected the console to have written to one of ${jasmine.pp(info.expectedTypes)}, but it wrote to '${
      actualLine.type
    }'.`;
    return { pass: false, message };
  }

  // check that the foreground colors match
  if (info.expectedForeColor && info.expectedForeColor !== actualLine.foreColor) {
    message = `Expected the console to have used '${info.expectedForeColor}' as the foreground color, but it used '${actualLine.foreColor}'.`;
    return { pass: false, message };
  }

  // check that the background colors match
  if (info.expectedBackColor && info.expectedBackColor !== actualLine.backColor) {
    message = `Expected the console to have used '${info.expectedBackColor}' as the background color, but it used '${actualLine.backColor}'.`;
    return { pass: false, message };
  }

  return { pass: true, message: '' };
}

/**
 * Compares using a 'not' comparison all of the attributes (if specified) of a line and returns a Jasmine result.
 */
function negativeCompareLine(actualLine: ColoredLine | undefined, info: ComparisonInfo): jasmine.CustomMatcherResult {
  let message: string;

  // check that there is at least one line
  if (!actualLine) {
    return { pass: true, message: '' };
  }

  // check that the messages don't match
  if (info.expectedMessage) {
    if (!doMessagesMatch(actualLine.message, info.expectedMessage, info.util, info.customEqualityTesters)) {
      return { pass: true, message: '' };
    }

    if (typeof info.expectedMessage === 'string') {
      message = `Expected the console not to have written ${jasmine.pp(info.expectedMessage)}, but it did.`;
    } else {
      message = `Expected the console not to have written a message matching ${jasmine.pp(
        info.expectedMessage,
      )}, but it wrote ${jasmine.pp(actualLine.message)}.`;
    }

    return { pass: false, message };
  }

  // check that the log types don't match
  if (info.expectedTypes && info.expectedTypes.includes(actualLine.type)) {
    message = `Expected the console not to have written to one of ${jasmine.pp(info.expectedTypes)}, but it did.`;
    return { pass: false, message };
  }

  // check that the foreground colors don't match
  if (info.expectedForeColor && actualLine.foreColor === info.expectedForeColor) {
    message = `Expected the console not to have used '${info.expectedForeColor}' as the foreground color, but it did.`;
    return { pass: false, message };
  }

  // check that the background colors don't match
  if (info.expectedBackColor && actualLine.backColor === info.expectedBackColor) {
    message = `Expected the console not to have used '${info.expectedBackColor}' as the background color, but it did.`;
    return { pass: false, message };
  }

  return { pass: true, message: '' };
}

function doMessagesMatch(
  actualMessage: string,
  expectedMessage: string | RegExp,
  util: jasmine.MatchersUtil,
  customEqualityTesters: readonly jasmine.CustomEqualityTester[],
): boolean {
  if (expectedMessage instanceof RegExp) {
    return expectedMessage.test(actualMessage);
  }

  return util.equals(actualMessage, expectedMessage, customEqualityTesters);
}
