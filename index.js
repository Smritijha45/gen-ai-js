import readline from "readline";
import { streamGemini } from "./gemini/geminiStreamClient.js";
import { resetContext } from "./utils/chatContext.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(" Gemini Streaming Chat");
console.log("Commands: exit | reset\n");

function chat() {
  rl.question("You: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("\n Bye!");
      rl.close();
      return;
    }

    if (input.toLowerCase() === "reset") {
      resetContext();
      console.log(" Context cleared\n");
      chat();
      return;
    }

    console.log("\nGemini: ");
    await streamGemini(input);
    console.log("\n");

    chat();
  });
}

chat();
