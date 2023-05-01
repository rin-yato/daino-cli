import gradient from "gradient-string";
import animate from "../libs/animate.js";
import sleep from "../libs/sleep.js";
import logger from "../libs/logger.js";

export default async function () {
  const welcomeText = animate("Welcome to the Daino CLI starter pack!");
  await sleep(1000);
  welcomeText.stop();

  console.log(gradient.pastel("Read the docs at"));
  logger.info("https://npmjs.com/package/daino");
}
