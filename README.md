# gachchan: common funcs for both Serverside and Clientside

[![npm version](https://badgen.net/npm/v/gachchan)](https://npm.im/gachchan) [![npm downloads](https://badgen.net/npm/dt/gachchan)](https://npm.im/gachchan)
[![Push (CI check)](https://github.com/gurucore/gachchan/actions/workflows/push.yml/badge.svg)](https://github.com/gurucore/gachchan/actions/workflows/push.yml)

## Install

`npm i gachchan`

## Notable Dependencies

- nanoid

Peers

- lodash
- decimal.js

## Sponsors

https://github.com/sponsors/lockevn

---

# To publish/release

- change `package.json` version string
- (Optional) run in local those commands `pnpm run ci` and `pnpm release` to build the output package (to test)
- Create git tag and publish the git tag

---

# Development

### TECH NOTE: How we setup Deps

This lib `gachchan` use `_intersection from 'lodash/intersection'` to import function from `lodash`

- `_intersection` will not be bundled into `gachchan` by default. When you write `import \_intersection from 'lodash/intersection'`, it creates a dependency that expects `lodash` to be available at runtime.

- Specify `"peerDependencies":  {    "lodash": "^4.17.21"   }`​ in `gachchan`.

  > You're using `lodash` but want to allow the consuming project to control the `lodash` version
  > It prevents multiple copies of `lodash` in the final application
  > It makes it clear to users of `gachchan` that they need to install `lodash`

- Do `tts-wallet` (which use `gachchan`) need to depend on `lodash`?

  - Yes, `tts-wallet` needs to install `lodash` as a direct dependency because:
  - It's a peer dependency of `gachchan`
    The import statements in `gachchan` expect to find `lodash` in `node_modules`
  - If `tts-wallet` doesn't install `lodash`, you'll get runtime errors about missing modules

### TECH NOTE: build with Parcel

- Parcel to build https://dev.to/ihaback/create-your-own-typescript-library-with-parceljs-3dh7
- Package manager [pnpm](https://pnpm.js.org/)
- Release with [semantic-release](https://npm.im/semantic-release)
- Test with https://vitest.dev
