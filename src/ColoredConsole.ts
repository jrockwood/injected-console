import { Color } from './ConsoleColors';

export type LogType = 'assert' | 'error' | 'info' | 'log' | 'warn' | 'success';

/**
 * Contains the default prefixes to use for each type of log message, which are `assert: `, `error: `,
 * and `warning: `. There is no prefix for `info` and `log`.
 */
export const defaultLogTypePrefixes: ReadonlyMap<LogType, string> = new Map<LogType, string>([
  ['assert', 'assert: '],
  ['error', 'error: '],
  ['info', ''],
  ['log', ''],
  ['warn', 'warning: '],
  ['success', ''],
]);

/**
 * Represents a console that is capable of printing in color. This generally has the same method
 * names as the built-in `console` object in Node or the browser. However, it is not meant as a
 * complete replacement. Its strength comes into play by allowing it to be injected into classes or
 * functions and then allowing unit tests to inspect what was written to the console.
 */
export abstract class ColoredConsole {
  /**
   * Determines whether the defined prefixes should be used when logging messages.
   */
  public usePrefixes: boolean;

  protected constructor(usePrefixes: boolean) {
    this.usePrefixes = usePrefixes;
  }

  /**
   * Contains prefixes to use for each type of log message. By default, this is set to
   * {@link defaultLogTypePrefixes}.
   */
  public readonly prefixes: Map<LogType, string> = new Map<LogType, string>(defaultLogTypePrefixes.entries());

  /**
   * Prints a message to the console `assert` stream. Note that this simplifies the normal
   * `console.assert` function in that only strings are accepted and there is no support for
   * parameters.
   * @param value The value to assert on.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'red'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public abstract assert(value: boolean, message?: string, foreColor?: Color, backColor?: Color): void;

  /**
   * Prints a message to the console `error` stream. Note that this simplifies the normal
   * `console.error` function in that only strings are accepted and there is no support for
   * parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'red'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public abstract error(message?: string, foreColor?: Color, backColor?: Color): void;

  /**
   * Prints a message to the console `info` stream. Note that this simplifies the normal
   * `console.info` function in that only strings are accepted and there is no support for
   * parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'inherit'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public abstract info(message?: string, foreColor?: Color, backColor?: Color): void;

  /**
   * Prints a message to the console `log` stream. Note that this simplifies the normal `console.log`
   * function in that only strings are accepted and there is no support for parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'inherit'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public abstract log(message?: string, foreColor?: Color, backColor?: Color): void;

  /**
   * Prints a message to the console `warn` stream. Note that this simplifies the normal
   * `console.warn` function in that only strings are accepted and there is no support for
   * parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'yellow'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public abstract warn(message?: string, foreColor?: Color, backColor?: Color): void;

  /**
   * Prints a success message to the console in green using the 'info' stream.
   * @param message An optional message to print. Defaults to 'Success'.
   * @param foreColor An optional foreground color to use. Defaults to 'green'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public abstract success(message?: string, foreColor?: Color, backColor?: Color): void;

  /**
   * Prefixes the message if necessary by looking up the prefix defined for the log type. If message
   * is undefined, null, or empty, then no prefix is used.
   * @param type The type of message to prefix.
   * @param message The message to prefix.
   */
  protected prefixMessage(type: LogType, message: string = ''): string {
    if (this.usePrefixes && message.length > 0) {
      const prefix = this.prefixes.get(type) || '';
      message = prefix + message;
    }

    return message;
  }
}
