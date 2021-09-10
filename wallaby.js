module.exports = () => {
  return {
    files: [
      { pattern: 'node_modules/jasmine-expect/dist/jasmine-matchers.js', instrument: false, load: true },
      'src/**/*.ts',
    ],
    tests: ['test/**/*.test.ts'],

    env: {
      type: 'node',
    },

    testFramework: 'jasmine',

    /**
     * The following two props are required to make Jasmine custom matchers work.
     *
     * Fixes an issue in Wallaby where Jasmine custom matchers are only loaded the first time the module
     * is required. It does this by removing the cached module in `require`. Kind of hacky, but it's
     * what is suggested here: https://github.com/wallabyjs/public/issues/786#issuecomment-246220668.
     */
    setup: (_wallabySetupArg) => {
      const cacheKeys = Object.keys(require.cache);

      // remove all of the cache entries for jasmine-expect and reload them every instance of a test
      const allJasmineMatchers = cacheKeys.filter((key) => key.includes('jasmine-expect'));
      if (allJasmineMatchers.length > 0) {
        allJasmineMatchers.forEach((key) => delete require.cache[key]);
      }

      require('jasmine-expect');
    },

    workers: {
      recycle: true,
    },
  };
};
