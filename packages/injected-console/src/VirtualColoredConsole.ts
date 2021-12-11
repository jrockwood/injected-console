import { ColoredConsole, ColoredConsoleOptions, LogType } from './ColoredConsole';
import { Color } from './ConsoleColors';

/**
 * Represents a colored line that was logged to the [[VirtualColoredConsole]].
 */
export interface ColoredLine {
  readonly type: LogType;
  readonly message: string;
  readonly foreColor: Color;
  readonly backColor: Color;
}

/**
 * Implements a mock console to allow for easy inspection of console logging in unit tests.
 */
export class VirtualColoredConsole extends ColoredConsole {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Properties

  private readonly _lines: ColoredLine[] = [];

  public get lines(): readonly ColoredLine[] {
    return this._lines;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Constructor

  public constructor(options?: ColoredConsoleOptions) {
    super(options);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Methods

  /**
   * Prints a message to the virtual console `assert` stream. Note that this simplifies the normal
   * `console.assert` function in that only strings are accepted and there is no support for
   * parameters.
   * @param value The value to assert on.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'red'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public assert(value: boolean, message: string = '', foreColor: Color = 'red', backColor: Color = 'inherit'): void {
    if (value) {
      return;
    }

    const line: ColoredLine = { type: 'assert', message: this.prefixMessage('assert', message), foreColor, backColor };
    this._lines.push(line);
  }

  /**
   * Prints a message to the virtual console `error` stream. Note that this simplifies the normal
   * `console.error` function in that only strings are accepted and there is no support for
   * parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'red'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public error(message: string = '', foreColor: Color = 'red', backColor: Color = 'inherit'): void {
    const line: ColoredLine = { type: 'error', message: this.prefixMessage('error', message), foreColor, backColor };
    this._lines.push(line);
  }

  /**
   * Prints a message to the virtual console `log` stream. Note that this simplifies the normal
   * `console.log` function in that only strings are accepted and there is no support for
   * parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'inherit'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public log(message: string = '', foreColor: Color = 'inherit', backColor: Color = 'inherit'): void {
    const line: ColoredLine = { type: 'log', message: this.prefixMessage('log', message), foreColor, backColor };
    this._lines.push(line);
  }

  /**
   * Prints a message to the virtual console `info` stream. Note that this simplifies the normal
   * `console.info` function in that only strings are accepted and there is no support for
   * parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'inherit'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public info(message: string = '', foreColor: Color = 'inherit', backColor: Color = 'inherit'): void {
    const line: ColoredLine = { type: 'info', message: this.prefixMessage('info', message), foreColor, backColor };
    this._lines.push(line);
  }

  /**
   * Prints a message to the virtual console `warn` stream. Note that this simplifies the normal
   * `console.warn` function in that only strings are accepted and there is no support for
   * parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'yellow'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public warn(message: string = '', foreColor: Color = 'yellow', backColor: Color = 'inherit'): void {
    const line: ColoredLine = { type: 'warn', message: this.prefixMessage('warn', message), foreColor, backColor };
    this._lines.push(line);
  }

  /**
   * Prints a success message to the console in green using the 'info' stream.
   * @param message An optional message to print. Defaults to 'Success'.
   * @param foreColor An optional foreground color to use. Defaults to 'green'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public success(message: string = 'Success', foreColor: Color = 'green', backColor: Color = 'inherit'): void {
    const line: ColoredLine = {
      type: 'success',
      message: this.prefixMessage('success', message),
      foreColor,
      backColor,
    };
    this._lines.push(line);
  }

  /**
   * Clears the virtual console, so there are no tracked messages.
   */
  public clear(): void {
    this._lines.length = 0;
  }
}
