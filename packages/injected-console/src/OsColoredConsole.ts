import chalk from 'chalk';
import { ColoredConsole, ColoredConsoleOptions, LogType } from './ColoredConsole';
import { Color } from './ConsoleColors';

/**
 * Defines the "real" console as defined by the OS, which should be outside of unit tests.
 */
export class OsColoredConsole extends ColoredConsole {
  public constructor(options?: ColoredConsoleOptions) {
    super(options);
  }

  /**
   * Prints a message to the console `assert` stream. Note that this simplifies the normal
   * `console.assert` function in that only strings are accepted and there is no support for
   * parameters.
   * @param value The value to assert on.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'red'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public assert(value: boolean, message?: string, foreColor: Color = 'red', backColor?: Color): void {
    console.assert(value, this.colorizeAndPrefix('assert', message, foreColor, backColor));
  }

  /**
   * Prints a message to the console `error` stream. Note that this simplifies the normal
   * `console.error` function in that only strings are accepted and there is no support for
   * parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'red'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public error(message?: string, foreColor: Color = 'red', backColor?: Color): void {
    console.error(this.colorizeAndPrefix('error', message, foreColor, backColor));
  }

  /**
   * Prints a message to the console `info` stream. Note that this simplifies the normal
   * `console.info` function in that only strings are accepted and there is no support for
   * parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'inherit'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public info(message?: string, foreColor?: Color, backColor?: Color): void {
    console.info(this.colorizeAndPrefix('info', message, foreColor, backColor));
  }

  /**
   * Prints a message to the console `log` stream. Note that this simplifies the normal `console.log`
   * function in that only strings are accepted and there is no support for parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'inherit'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public log(message?: string, foreColor?: Color, backColor?: Color): void {
    console.log(this.colorizeAndPrefix('log', message, foreColor, backColor));
  }

  /**
   * Prints a message to the console `warn` stream. Note that this simplifies the normal
   * `console.warn` function in that only strings are accepted and there is no support for
   * parameters.
   * @param message An optional message to print.
   * @param foreColor An optional foreground color to use. Defaults to 'yellow'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public warn(message?: string, foreColor: Color = 'yellow', backColor?: Color): void {
    console.warn(this.colorizeAndPrefix('warn', message, foreColor, backColor));
  }

  /**
   * Prints a success message to the console in green using the 'info' stream.
   * @param message An optional message to print. Defaults to 'Success'.
   * @param foreColor An optional foreground color to use. Defaults to 'green'.
   * @param backColor An optional background color to use. Defaults to 'inherit'.
   */
  public success(message: string = 'Success', foreColor: Color = 'green', backColor?: Color): void {
    console.info(this.colorizeAndPrefix('success', message, foreColor, backColor));
  }

  /**
   * Colorizes the message by adding required console formatting directives to the string. Also adds
   * the prefix if specified in {@link prefixes}.
   * @param type The log type of the message, which determines the prefix to use.
   * @param message The message to colorize.
   * @param foreColor The foreground color of the text.
   * @param backColor The background color of the text.
   */
  private colorizeAndPrefix(type: LogType, message?: string, foreColor?: Color, backColor?: Color): string {
    const func = getColorFunc(foreColor, backColor);
    const prefixedMessage: string = this.prefixMessage(type, message);

    return func(prefixedMessage);
  }
}

type ColorFunc = (message: string) => string;
const identityColorFunc: ColorFunc = (message: string) => message;

const colorToFuncMap: Map<Color, ColorFunc> = new Map([
  ['black', chalk.black],
  ['red', chalk.red],
  ['green', chalk.green],
  ['yellow', chalk.yellow],
  ['blue', chalk.blue],
  ['magenta', chalk.magenta],
  ['cyan', chalk.cyan],
  ['white', chalk.white],
  ['gray', chalk.gray],
]);

/**
 * Gets a function that will colorize a string input.
 * @param foreColor The optional foreground color.
 * @param backColor The optional background color.
 */
function getColorFunc(foreColor: Color = 'inherit', backColor: Color = 'inherit'): ColorFunc {
  const foreground = colorToFuncMap.get(foreColor) || identityColorFunc;
  const background = colorToFuncMap.get(backColor) || identityColorFunc;

  const func: ColorFunc = (message: string) => {
    return background(foreground(message));
  };

  return func;
}
