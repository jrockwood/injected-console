import { ConsoleErrorReporter, ErrorReporter } from '../src/ErrorReporter';
import { VirtualColoredConsole } from '../src/VirtualColoredConsole';

describe('ErrorReporter', () => {
  it('should keep track of all messages logged in order', () => {
    const reporter = new ErrorReporter();
    reporter.log('one');
    reporter.info('two');
    reporter.warn('three');
    reporter.error('four');
    reporter.error('five');
    reporter.warn('six');
    reporter.info('seven');
    reporter.log('eight');

    expect(reporter.allMessages).toEqual(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']);
    expect(reporter.logMessages).toEqual(['one', 'eight']);
    expect(reporter.infoMessages).toEqual(['two', 'seven']);
    expect(reporter.warningMessages).toEqual(['three', 'six']);
    expect(reporter.errorMessages).toEqual(['four', 'five']);
  });

  describe('clear()', () => {
    it('should clear all of the logged messages', () => {
      const reporter = new ErrorReporter();
      reporter.log('one');
      reporter.info('two');
      reporter.clear();

      expect(reporter.allMessages).toBeEmptyArray();
    });
  });
});

describe('ConsoleErrorReporter', () => {
  it('should keep track of all messages logged in order', () => {
    const reporter = new ConsoleErrorReporter(new VirtualColoredConsole());
    reporter.log('one');
    reporter.info('two');
    reporter.warn('three');
    reporter.error('four');
    reporter.error('five');
    reporter.warn('six');
    reporter.info('seven');
    reporter.log('eight');

    expect(reporter.allMessages).toEqual(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']);
    expect(reporter.logMessages).toEqual(['one', 'eight']);
    expect(reporter.infoMessages).toEqual(['two', 'seven']);
    expect(reporter.warningMessages).toEqual(['three', 'six']);
    expect(reporter.errorMessages).toEqual(['four', 'five']);
  });

  it('should also log to the console', () => {
    const virtualConsole = new VirtualColoredConsole({ suppressPrefixes: true });
    const reporter = new ConsoleErrorReporter(virtualConsole);
    reporter.log('one');
    reporter.info('two');
    reporter.warn('three');
    reporter.error('four');
    reporter.error('five');
    reporter.warn('six');
    reporter.info('seven');
    reporter.log('eight');

    expect(virtualConsole.lines).toEqual([
      { type: 'log', message: 'one', foreColor: 'inherit', backColor: 'inherit' },
      { type: 'info', message: 'two', foreColor: 'inherit', backColor: 'inherit' },
      { type: 'warn', message: 'three', foreColor: 'yellow', backColor: 'inherit' },
      { type: 'error', message: 'four', foreColor: 'red', backColor: 'inherit' },
      { type: 'error', message: 'five', foreColor: 'red', backColor: 'inherit' },
      { type: 'warn', message: 'six', foreColor: 'yellow', backColor: 'inherit' },
      { type: 'info', message: 'seven', foreColor: 'inherit', backColor: 'inherit' },
      { type: 'log', message: 'eight', foreColor: 'inherit', backColor: 'inherit' },
    ]);
  });
});
