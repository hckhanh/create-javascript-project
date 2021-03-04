import { Command, flags } from "@oclif/command";
import { cli } from "cli-ux";
import { FormatterFactory } from "./formatters/FormatterFactory";
import { GeneratorFactory } from "./generators/GeneratorFactory";
import { collectAnswers } from "./inquirer";

class CreateJavascriptProject extends Command {
  static description = "describe the command here";

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
  };

  // static args = [{name: 'file'}]

  async run() {
    const { args, flags } = this.parse(CreateJavascriptProject);
    const answers = await collectAnswers();

    const formatterFactory = FormatterFactory.getInstance();
    const formatter = formatterFactory.createFormatter(answers.format);

    const generatorFactory = GeneratorFactory.getInstance();
    const generators = answers.configurations.map((type) =>
      generatorFactory.createGenerator(type, answers, formatter),
    );

    for (let i = 0; i < generators.length; i++) {
      cli.action.start(`generating ${answers.configurations[i]}`);
      await generators[i].run();
      cli.action.stop();
    }
  }
}

export = CreateJavascriptProject;
