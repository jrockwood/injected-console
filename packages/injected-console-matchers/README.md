# @jrockwood/injected-console-matchers

> Custom Jasmine matchers for the
> [@jrockwood/injected-console](https://github.com/jrockwood/injected-console) library

![injected-console icon](./docs/images/injected-console-256.png)

## Overview

See the README at [@jrockwood/injected-console](https://github.com/jrockwood/injected-console) for a
discussion about the reason for the library.

### Using supplied Jasmine matchers

This library provides custom Jasmine matchers to help in writing unit tests working with the
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
