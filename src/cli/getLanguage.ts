import inquirer from "inquirer";

export type Language = "TypeScript" | "JavaScript";

export default async function (): Promise<Language> {
  const { language } = await inquirer.prompt({
    type: "list",
    name: "language",
    message: "What language would you like to use?",
    choices: ["TypeScript", "JavaScript"],
  });

  return language;
}
