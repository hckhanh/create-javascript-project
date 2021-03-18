export const zeroInstalls = `
# yarn 2 (Zero-Installs)
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
`;

export const nonZeroInstalls = `
# yarn 2
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

export const ignoreFiles = `
build
dist
lib
coverage
.yarn
te?mp
`;

export const postIgnoreFiles = `
# Editors
.idea
.vscode
`;

export const flowConfigs = `
[ignore]
<PROJECT_ROOT>/node_modules/.*
<PROJECT_ROOT>/\(build\|dist\|lib\)/.*
<PROJECT_ROOT>/\(\.yarn\|te?mp\)/.*
<PROJECT_ROOT>/coverage/.*

[include]

[libs]

[lints]

[options]

[strict]
`;
