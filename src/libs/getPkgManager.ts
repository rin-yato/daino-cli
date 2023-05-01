import inquirer from "inquirer";
import { PackageManger } from "../types.js";
import log from "./log.js";

export default async function getPkgManager(): Promise<PackageManger> {
  const userAgent = process.env.npm_config_user_agent;
  let pkgManager: PackageManger;
  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      pkgManager = "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      pkgManager = "pnpm";
    } else {
      pkgManager = "npm";
    }
  } else {
    // If no user agent is set, assume npm
    pkgManager = "npm";
  }

  if (pkgManager === "npm") {
    const { selectedPkgManager } = await inquirer.prompt<{
      selectedPkgManager: PackageManger;
    }>({
      type: "list",
      name: "selectedPkgManager",
      message: "Which package manager do you want to use?",
      choices: ["npm", "yarn", "pnpm"],
    });

    pkgManager = selectedPkgManager;
  }

  log.info(`Using ${pkgManager} as package manager\n`);

  return pkgManager;
}
