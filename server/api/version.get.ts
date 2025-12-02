import pkg from '../../package.json';

export default defineEventHandler(async (event) => {
  return { version: pkg.version }
})
