import fs from "fs-extra";
import ora from "ora";

type Args = {
  projectName: string;
};

export default async function createProject({ projectName }: Args) {
  const isDev = process.env.STAGE === "dev";
  const cwd = isDev ? "../../" : process.cwd() + "/";
  const templatePath = new URL("../../template", import.meta.url);

  const creatingProjectSpinner = ora("Creating project").start();
  await fs.copy(templatePath.pathname, cwd + "/" + projectName);

  // Rename package.json -> name to the projectName
  const packageJsonPath = cwd + "/" + projectName + "/package.json";
  const packageJson = await fs.readJSON(packageJsonPath);
  packageJson.name = projectName;
  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });

  creatingProjectSpinner.succeed("Project created");
}
