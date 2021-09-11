import { ColoredConsole } from './ColoredConsole';

type MessageType = 'error' | 'warning' | 'info' | 'log';

/**
 * Keeps track of the different types of messages.
 *
 * Why not just use {@link ColoredConsole}? Well, we could and it's not that bad. However, it felt wrong
 * for anything other than a CLI interface to be using a console abstraction. This interface can be
 * used for internal operations or where the callee may want to batch several errors as a return
 * result.
 */
export class ErrorReporter {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Properties

  private readonly _rawMessages: [MessageType, string][] = [];

  /**
   * All of the messages that have been reported.
   */
  public get allMessages(): readonly string[] {
    return this._rawMessages.map((pair) => pair[1]);
  }

  /**
   * All of the error messages that have been reported.
   */
  public get errorMessages(): readonly string[] {
    return this._rawMessages.filter((message) => message[0] === 'error').map((pair) => pair[1]);
  }

  /**
   * All of the info messages that have been reported.
   */
  public get infoMessages(): readonly string[] {
    return this._rawMessages.filter((message) => message[0] === 'info').map((pair) => pair[1]);
  }

  /**
   * All of the log messages that have been reported.
   */
  public get logMessages(): readonly string[] {
    return this._rawMessages.filter((message) => message[0] === 'log').map((pair) => pair[1]);
  }

  /**
   * All of the warning messages that have been reported.
   */
  public get warningMessages(): readonly string[] {
    return this._rawMessages.filter((message) => message[0] === 'warning').map((pair) => pair[1]);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Methods

  /**
   * Clears all of the messages from the reporter.
   */
  public clear(): void {
    this._rawMessages.length = 0;
  }

  /**
   * Records an error message.
   * @param message The error message.
   */
  public error(message: string): void {
    this._rawMessages.push(['error', message]);
  }

  /**
   * Records a warning message.
   * @param message The warning message.
   */
  public warn(message: string): void {
    this._rawMessages.push(['warning', message]);
  }

  /**
   * Records an info message.
   * @param message The info message.
   */
  public info(message: string): void {
    this._rawMessages.push(['info', message]);
  }

  /**
   * Records a message.
   * @param message The message.
   */
  public log(message: string): void {
    this._rawMessages.push(['log', message]);
  }
}

/**
 * Keeps track of all messages reported and immediately logs incoming messages to the console.
 */
export class ConsoleErrorReporter extends ErrorReporter {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Properties

  public readonly coloredConsole: ColoredConsole;

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Constructor

  public constructor(coloredConsole: ColoredConsole) {
    super();
    this.coloredConsole = coloredConsole;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Methods

  /**
   * Records an error message and immediately sends it to the console.
   * @param message The error message.
   */
  public error(message: string): void {
    super.error(message);
    this.coloredConsole.error(message);
  }

  /**
   * Records a warning message and immediately sends it to the console.
   * @param message The warning message.
   */
  public warn(message: string): void {
    super.warn(message);
    this.coloredConsole.warn(message);
  }

  /**
   * Records an info message and immediately sends it to the console.
   * @param message The info message.
   */
  public info(message: string): void {
    super.info(message);
    this.coloredConsole.info(message);
  }

  /**
   * Records a message and immediately sends it to the console.
   * @param message The message.
   */
  public log(message: string): void {
    super.log(message);
    this.coloredConsole.log(message);
  }
}
