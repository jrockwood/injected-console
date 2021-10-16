import { VirtualColoredConsole } from '.';

declare function expect<T extends VirtualColoredConsole>(coloredConsole: T): jasmine.Matchers<T>;

declare global {
  namespace jasmine {
    interface Matchers<T> {
      /**
       * Verifies that the message matches, 'log' was used, and the fore and back colors are 'inherit'.
       */
      toHaveJustLogged(expectedMessage?: string | RegExp, ignoreColors?: boolean): boolean;

      /**
       * Verifies that the message matches, 'success' was used, the fore color is 'green', and the
       * back color is 'inherit'.
       */
      toHaveJustLoggedSuccess(expectedMessage?: string | RegExp, ignoreColors?: boolean): boolean;

      /**
       * Verifies that the last message matches, 'error' was used, the fore color is 'red', and the
       * back color is 'inherit'.
       */
      toHaveJustLoggedError(expectedMessage?: string | RegExp, ignoreColors?: boolean): boolean;

      /**
       * Verifies that the last message matches, 'warn' was used, the fore color is 'yellow', and the
       * back color is 'inherit'.
       */
      toHaveJustLoggedWarning(expectedMessage?: string | RegExp, ignoreColors?: boolean): boolean;

      /**
       * Verifies that the last message matches, 'info' was used, the fore color is 'inherit', and the
       * back color is 'inherit'.
       */
      toHaveJustLoggedInfo(expectedMessage?: string | RegExp, ignoreColors?: boolean): boolean;

      /**
       * Verifies that there is a line that has the specified message, or if the message is not
       * specified that there exists at least one line.
       */
      toHaveLine(expectedMessage?: string | RegExp): boolean;
    }
  }
}
