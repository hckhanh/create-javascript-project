export const zeroInstalls = `
# Yarn 2 (Zero-Installs + Plug'n'Play)
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
`;

export const nonZeroInstalls = `
# Yarn 2
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
    ecmaVersion: 13,
  },
  rules: {},
};

export const ignoreYarn2 = `
# Yarn
.yarn
.pnp.*
`;

export const ignoreFiles = `
# Builds
lib
dist
build

# Test
coverage

# Misc
te?mp
`;

export const postIgnoreFiles = `
# Editors
.idea
.vscode
`;

export const prettierConfigs = {
  semi: true,
  endOfLine: "lf",
  singleQuote: false,
};

export const prettierGitAttributeConfigs = `
* text=auto eol=lf
`;

export const flowConfigs = {
  ignore: {
    "<PROJECT_ROOT>/node_modules/.*": true,
    "<PROJECT_ROOT>/\\(build\\|dist\\|lib\\)/.*": true,
    "<PROJECT_ROOT>/\\(\\.yarn\\|te?mp\\)/.*": true,
    "<PROJECT_ROOT>/coverage/.*": true,
  },
  include: {},
  libs: {},
  lints: {},
  options: {
    all: true,
  },
  strict: {},
};

export const getChangesetBaseRefs = (branch = "master") =>
  [`${branch}`, `origin/${branch}`, `upstream/${branch}`].join(",");
