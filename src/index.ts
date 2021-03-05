import { Command, flags } from "@oclif/command";
import { cli } from "cli-ux";
import { checkPackageJson } from "./checker";
import { FormatterFactory } from "./formatters/FormatterFactory";
import { GeneratorFactory } from "./generators/GeneratorFactory";
import { collectAnswers } from "./inquirer";
import { PackagerFactory } from "./packagers/PackagerFactory";

class CreateJavascriptProject extends Command {
  static description = `Keep you away from boring procedures for new JavaScript/TypeScript project.1
  The following step which are executed:
    1. Generate/update configurations
    2. Create/update ignore files
    3. Add necessary dependencies
    4. Add accordingly scripts to "package.json" (optional)

  Note: technically, this tool is used for existing project.
  It must be run in a project directory with "package.json" file.
`;

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
  };

  async run() {
    this.parse(CreateJavascriptProject);
    await checkPackageJson();
    const answers = await collectAnswers();

    const formatterFactory = FormatterFactory.getInstance();
    const formatter = formatterFactory.createFormatter(answers.format);

    const packagerFactory = PackagerFactory.getInstance();
    const packager = packagerFactory.createPackager(answers.packager);

    const generatorFactory = GeneratorFactory.getInstance();
    const generators = answers.configurations.map((type) =>
      generatorFactory.createGenerator(type, answers, formatter, packager),
    );

    for (let i = 0; i < generators.length; i++) {
      cli.action.start(`Generating ${answers.configurations[i]}`);
      await generators[i].run();
      cli.action.stop();
    }
  }
}

export = CreateJavascriptProject;
