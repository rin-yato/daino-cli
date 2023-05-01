import figlet from "figlet";
import gradient from "gradient-string";

export default async function () {
  console.log(
    gradient.pastel.multiline(
      figlet.textSync("Daino cli", {
        font: "Standard",
      })
    )
  );
}
