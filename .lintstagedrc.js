// module.exports = {
//   // Type check TypeScript files
//   '**/*.(ts|tsx)': () => 'npx tsc --noEmit',

//   // Lint & Prettify TS and JS files
//   '**/*.(ts|tsx)': (filenames) => {
//     return [
//       `npx eslint --fix ${filenames.join(' ')}`,
//       `npx prettier --write ${filenames.join(' ')}`,
//     ]
//   },
// }

const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{ts,tsx}': [buildEslintCommand],
}
