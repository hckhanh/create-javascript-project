# create-javascript-project

Keep you away from boring procedures for new JavaScript/TypeScript project

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/create-javascript-project.svg)](https://npmjs.org/package/create-javascript-project)
[![Downloads/week](https://img.shields.io/npm/dw/create-javascript-project.svg)](https://npmjs.org/package/create-javascript-project)
[![License](https://img.shields.io/npm/l/create-javascript-project.svg)](https://github.com/hckhanh/create-javascript-project/blob/master/package.json)

<!-- toc -->

- [Description](#description)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

## Description

The following configurations of the common tools will be generated

- Yarn 2 (.yarn, .yarnrc.yml)
- ESLint (.eslintignore, .eslintrc)
- Prettier (.prettierrc)

You can choose which tool you want to set up

## Usage

The following step which are executed:

1. Generate/update configurations
1. Create/update ignore files
1. Add necessary dependencies
1. Add scripts to `package.json` (optional)

## Commands

You can run by these commands:

```shell
# npm
npx create-javascript-project

# yarn
yarn create javascript-project

# yarn 2
yarn dlx create-javascript-project
```

> Technically, this tool is used for existing project.
> It must be run in a project directory with `package.json` file.
