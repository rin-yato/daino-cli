#!/usr/bin/env node

import createProject from "./cli/createProject.js";
import getLanguage from "./cli/getLanguage.js";
import getProjectName from "./cli/getProjectName.js";
import installDependencies from "./cli/installDeps.js";
import welcome from "./cli/welcome.js";
import getPkgManager from "./libs/getPkgManager.js";

// CLI starting point
async function main() {
  await welcome();
  const pkgManager = await getPkgManager();
  const projectName = await getProjectName();
  const language = await getLanguage();
  await createProject({ projectName });
  await installDependencies(pkgManager, projectName);
}

// Run the CLI
main();
