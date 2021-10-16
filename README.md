# @jrockwood/injected-console

> Enables unit tests to easily mock the console.

![injected-console icon](./docs/images/injected-console-256.png)

## Overview

There are plenty of console mocking libraries out there, but most of them take the same approach of
enabling and disabling the mocking for the entire system. This can be really useful in some cases,
but there are times where you may want to have finer-grained control over which parts of your
application are mocked. Additionally, it can be useful to have explicit knowledge about which pieces
of the application use the console. As such, the approach that this library takes is to create an
interface which is then injected via a constructor or just a parameter into a function.

The abstract base class is `ColoredConsole` and two different classes provide the implementation:
`OsColoredConsole` and `VirtualColoredConsole`.

Additionally, there are two closely-related classes that keep track of messages to log, but without
colors. `ErrorReporter` simply keeps track of which messages were reported and
`ConsoleErrorReporter` keeps track and also immediately sends it to the supplied console.
`ErrorReporter` allows a function to report multiple errors/messages in a function, but without
knowing or caring that these messages might be written to the console. The semantics of the message
are stored (error vs. warning), but there is no implied UI for the message (print to the console vs.
write to a file). Although there is no `FileErrorReporter`, one could be added very easily to
support file logging. There are lots of logging libraries out there, so be careful in adding to this
library that we're not trying to replicate a general-purpose logging library. It's meant to be
simple.

## Getting Started

Add a reference to your `package.json` file using `npm` or `yarn`.

```bash
yarn add @jrockwood/injected-console
```

Note that if you're using TypeScript, the type definitions are already included in this library and
don't need to be added via npm/yarn.

## Examples

### Consuming an injected `ColoredConsole`

The following code shows an example of how to use the `ColoredConsole` interface inside of
application code as an injected dependency.

#### `code.ts`

```ts
import { ColoredConsole, OsColoredConsole } from '@jrockwood/injected-console';

// By default callers don't need to specify a ColoredConsole to use and it will just default to the
// native `console` object. Unit tests will pass in a `VirtualColoredConsole` object to use.
export function printSomething(coloredConsole: ColoredConsole = new OsColoredConsole()) {
  coloredConsole.log('Some message', 'magenta');
}
```

### Mocking the `ColoredConsole` in unit tests

Below is an example of how to construct a `VirtualColoredConsole` inside of a unit test so that
nothing is actually printed to the console.

#### `code.test.ts`

```ts
import { VirtualColoredConsole } from '@jrockwood/injected-console';
import { printSomething } from './code';

describe('printSomething', () => {
  it('should have logged something', () => {
    const virtualConsole = new VirtualColoredConsole();
    printSomething(virtualConsole);
    expect(virtualConsole).toHaveJustLogged();
  });

  it('should write something specific', () => {
    const virtualConsole = new VirtualColoredConsole();
    printSomething(virtualConsole);
    expect(virtualConsole).toHaveJustLogged('Some message');
  });

  it('should verify all properties of all lines in oreder', () => {
    const virtualConsole = new VirtualColoredConsole();
    printSomething(virtualConsole);
    expect(virtualConsole.lines).toEqual([
      { type: 'log', message: 'Some message', foreColor: 'magenta', backColor: 'inherit' },
    ]);
  });
});
```

### Using supplied Jasmine matchers

This library also provides custom Jasmine matchers to help in writing unit tests working with the
`VirtualColoredConsole`. They're included by default when importing the library.

```ts
// -----------------------------------------------------------------------------
// Most common

/**
 * Verifies that the message matches, 'log' was used, and the fore and back
 * colors are 'inherit'.
 */
expect(coloredConsole).toHaveJustLogged(string? | RegExp?, ignoreColors?: boolean);

/**
 * Verifies that the message matches, 'success' was used, the fore color is 'green', and
 * the back color is 'inherit'.
 */
expect(coloredConsole).toHaveJustLoggedSuccess(string? | RegExp?, ignoreColors?: boolean);

/**
 * Verifies that the last message matches, 'error' was used, the fore color is
 * 'red', and the back color is 'inherit'.
 */
expect(coloredConsole).toHaveJustLoggedError(string? | RegExp?, ignoreColors?: boolean);

/**
 * Verifies that the last message matches, 'warn' was used, the fore color is
 * 'yellow', and the back color is 'inherit'.
 */
expect(coloredConsole).toHaveJustLoggedWarning(string? | RegExp?, ignoreColors?: boolean);

/**
 * Verifies that the last message matches, 'info' was used, the fore color is
 * 'inherit', and the back color is 'inherit'.
 */
expect(coloredConsole).toHaveJustLoggedInfo(string? | RegExp?, ignoreColors?: boolean);

// -----------------------------------------------------------------------------
// Checking existence of messages (unordered)
expect(coloredConsole).toHaveLine(string? | RegExp?);
```
