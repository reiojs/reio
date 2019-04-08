module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)spec)\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
