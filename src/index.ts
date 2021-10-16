// Import the jasmine matchers so that they're automatically included when using this
// library (in a runtime context, it's a no-op since we detect if jasmine is defined).
import './JasmineMatchers';

export { ColoredConsole, ColoredConsoleOptions, defaultLogTypePrefixes, LogType } from './ColoredConsole';
export { Color } from './ConsoleColors';
export { ConsoleErrorReporter, ErrorReporter } from './ErrorReporter';
export { OsColoredConsole } from './OsColoredConsole';
export { ColoredLine, VirtualColoredConsole } from './VirtualColoredConsole';
