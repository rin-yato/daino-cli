import chalk from "chalk";

const log = {
  info: (message: string) => {
    console.log(chalk.blueBright(message));
  },
  success: (message: string) => {
    console.log(chalk.greenBright(message));
  },
  warning: (message: string) => {
    console.log(chalk.yellowBright(message));
  },
  error: (message: string) => {
    console.log(chalk.redBright(message));
  },
};

export default log;
