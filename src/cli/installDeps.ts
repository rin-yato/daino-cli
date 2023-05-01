import { PackageManger } from "../types.js";
import { execa } from "execa";
import ora from "ora";
import log from "../libs/log.js";
import inquirer from "inquirer";
import chalk from "chalk";

async function installationPrompt(pkgManager: PackageManger) {
  const { install } = await inquirer.prompt<{ install: string }>({
    type: "confirm",
    name: "install",
    message: `Would you like to run ${chalk.bold.blueBright(
      pkgManager + " install"
    )} ?`,
    default: true,
  });

  return install;
}

async function installationProcess(
  pkgManager: PackageManger,
  projectDir: string
) {
  switch (pkgManager) {
    // When using npm, inherit the stderr stream so that the progress bar is shown
    case "npm":
      await execa(pkgManager, ["install"], {
        cwd: projectDir,
        stderr: "inherit",
      });

      return null;

    // When using yarn or pnpm, use the stdout stream and ora spinner to show the progress
    case "pnpm":
      const pnpmSpinner = ora("Running pnpm install...").start();
      const pnpmSubprocess = execa(pkgManager, ["install"], {
        cwd: projectDir,
        stdout: "pipe",
      });

      await new Promise<void>((res, rej) => {
        pnpmSubprocess.stdout?.on("data", (data: Buffer) => {
          const text = data.toString();

          if (text.includes("Progress")) {
            pnpmSpinner.text = text.includes("|")
              ? text.split(" | ")[1] ?? ""
              : text;
          }
        });
        pnpmSubprocess.on("error", (e) => rej(e));
        pnpmSubprocess.on("close", () => res());
      });

      return pnpmSpinner;

    case "yarn":
      const yarnSpinner = ora("Running yarn...").start();
      const yarnSubprocess = execa(pkgManager, [], {
        cwd: projectDir,
        stdout: "pipe",
      });

      await new Promise<void>((res, rej) => {
        yarnSubprocess.stdout?.on("data", (data: Buffer) => {
          yarnSpinner.text = data.toString();
        });
        yarnSubprocess.on("error", (e) => rej(e));
        yarnSubprocess.on("close", () => res());
      });

      return yarnSpinner;
  }
}

export default async function installDependencies(
  pkgManager: PackageManger,
  projectName: string
) {
  const shouldInstall = await installationPrompt(pkgManager);

  if (!shouldInstall) return;

  const projectDir = process.cwd() + "/" + projectName;

  log.info("\nInstalling dependencies...\n");

  const installation = await installationProcess(pkgManager, projectDir);

  (installation || ora()).succeed("Dependencies installed successfully!\n");

  log.info("Enjoy your new project!\n");

  return;
}
