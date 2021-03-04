export const zeroInstalls = `
# yarn (Zero-Installs) - https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
`;

export const nonZeroInstalls = `
# yarn (Zero-Installs) - https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored
.yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions
.pnp.*
`;

export const eslintBaseConfigs = {
  env: {
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [],
  rules: {},
};

export const ignoreFiles = `build
dist
lib
coverage
`;
