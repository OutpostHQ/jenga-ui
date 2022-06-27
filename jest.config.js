/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  coverageDirectory: './coverage/',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          target: 'es2021',
          transform: { react: { runtime: 'automatic' } },
        },
      },
    ],
  },
  setupFilesAfterEnv: ['./packages/core/test/setup.ts'],
}

module.exports = config