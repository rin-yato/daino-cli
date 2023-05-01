import inquirer from "inquirer";

export default async function () {
  const { projectName } = await inquirer.prompt({
    type: "input",
    name: "projectName",
    message: "What is the name of your project?",
    validate: (input) => {
      if (input.length < 1) {
        return "Please enter a project name";
      }

      if (input.includes(" ")) {
        return "Please enter a project name without spaces";
      }

      if (input.match(/[^a-z0-9-]/gi)) {
        return "Please enter a project name with only alphanumeric characters and dashes";
      }

      return true;
    },
  });

  return projectName;
}
