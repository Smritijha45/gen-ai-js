import readline from "readline";
import { askGemini } from "./gemini/geminiClient.js";
import { resetContext } from "./utils/chatContext.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(" Gemini Terminal Chat");
console.log("Commands: exit | reset\n");

function chat() {
  rl.question("You: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log(" Bye!");
      rl.close();
      return;
    }

    if (input.toLowerCase() === "reset") {
      resetContext();
      console.log("Context cleared\n");
      chat();
      return;
    }

    const { text } = await askGemini(input);
    console.log(`\nGemini: ${text}\n`);

    chat();
  });
}

chat();
