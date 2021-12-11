import { defaultLogTypePrefixes, LogType } from '../src/ColoredConsole';
import { Color } from '../src/ConsoleColors';
import { VirtualColoredConsole } from '../src/VirtualColoredConsole';

describe('VirtualColoredConsole', () => {
  it('should log multiple types of messages and keep track of them in order', () => {
    const virtualConsole = new VirtualColoredConsole();
    virtualConsole.assert(false, 'assert', 'black', 'blue');
    virtualConsole.error('error', 'blue', 'cyan');
    virtualConsole.info('info', 'gray', 'magenta');
    virtualConsole.log('log', 'red', 'yellow');
    virtualConsole.warn('warn', 'yellow', 'black');

    expect(virtualConsole.lines.map((line) => line.type)).toEqual(['assert', 'error', 'info', 'log', 'warn']);
  });

  describe('assert', () => {
    testStandardBehaviorForType('assert', 'red');

    it('should not log anything if the condition is true', () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.assert(true, 'message');
      expect(virtualConsole.lines).toBeEmptyArray();
    });

    it('should log something if the condition is false', () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.assert(false, 'message');
      expect(virtualConsole.lines).toHaveSize(1);
    });
  });

  describe('error', () => {
    testStandardBehaviorForType('error', 'red');
  });

  describe('log', () => {
    testStandardBehaviorForType('log', 'inherit');
  });

  describe('info', () => {
    testStandardBehaviorForType('info', 'inherit');
  });

  describe('warn', () => {
    testStandardBehaviorForType('warn', 'yellow');
  });

  describe('success', () => {
    testStandardBehaviorForType('success', 'green');

    it("should use the message 'Success' by default", () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.success();
      expect(virtualConsole.lines[0].message).toBe('Success');
    });
  });

  describe('clear', () => {
    it('should clear the lines', () => {
      const virtualConsole = new VirtualColoredConsole();
      virtualConsole.warn('message', 'red', 'white');
      expect(virtualConsole.lines).not.toBeEmptyArray();
      virtualConsole.clear();
      expect(virtualConsole.lines).toBeEmptyArray();
    });
  });
});

type LogFunc = (virtualConsole: VirtualColoredConsole, message?: string, foreColor?: Color, backColor?: Color) => void;

function getLogFunc(type: LogType): LogFunc {
  switch (type) {
    case 'assert':
      return (virtualConsole, message, fore, back) => virtualConsole.assert(false, message, fore, back);
    case 'error':
      return (virtualConsole, message, fore, back) => virtualConsole.error(message, fore, back);
    case 'warn':
      return (virtualConsole, message, fore, back) => virtualConsole.warn(message, fore, back);
    case 'info':
      return (virtualConsole, message, fore, back) => virtualConsole.info(message, fore, back);
    case 'success':
      return (virtualConsole, message, fore, back) => virtualConsole.success(message, fore, back);
    case 'log':
    default:
      return (virtualConsole, message, fore, back) => virtualConsole.log(message, fore, back);
  }
}

function testStandardBehaviorForType(type: LogType, expectedForeColor: Color): void {
  const logFunc: LogFunc = getLogFunc(type);
  const expectedPrefix: string = defaultLogTypePrefixes.get(type)!;

  it('should record all of the information when logging', () => {
    const virtualConsole = new VirtualColoredConsole();
    logFunc(virtualConsole, 'message', 'red', 'white');
    expect(virtualConsole.lines).toEqual([
      { type, message: jasmine.stringMatching(/.*message/), foreColor: 'red', backColor: 'white' },
    ]);
  });

  it('should log in the expected color by default', () => {
    const virtualConsole = new VirtualColoredConsole();
    logFunc(virtualConsole, 'message');
    expect(virtualConsole.lines[0].foreColor).toBe(expectedForeColor);
  });

  it('should use the default prefix when not defined and suppressPrefixes is false', () => {
    const virtualConsole = new VirtualColoredConsole({ suppressPrefixes: false });
    logFunc(virtualConsole, 'message');
    expect(virtualConsole.lines[0].message).toBe(`${expectedPrefix}message`);
  });

  it('should not use the default prefix when suppressPrefixes is true', () => {
    const virtualConsole = new VirtualColoredConsole({ suppressPrefixes: true });
    logFunc(virtualConsole, 'message');
    expect(virtualConsole.lines[0].message).toBe('message');
  });

  it('should use the defined prefix when suppressPrefixes is false', () => {
    const virtualConsole = new VirtualColoredConsole({ suppressPrefixes: false });
    virtualConsole.prefixes.set(type, 'prefix: ');
    logFunc(virtualConsole, 'message');
    expect(virtualConsole.lines[0].message).toBe('prefix: message');
  });

  it('should not use the defined prefix when suppressPrefixes is true', () => {
    const virtualConsole = new VirtualColoredConsole({ suppressPrefixes: true });
    virtualConsole.prefixes.set(type, 'prefix: ');
    logFunc(virtualConsole, 'message');
    expect(virtualConsole.lines[0].message).toBe('message');
  });
}
