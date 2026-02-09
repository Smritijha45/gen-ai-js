import readline from "readline";
import { askGemini } from "./gemini/geminiClient.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Gemini Terminal Chat");
console.log("Type your message. Type 'exit' to quit.\n");

function askQuestion() {
  rl.question("You: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("\n👋 Exiting chat. Bye!");
      rl.close();
      return;
    }

    try {
      const { text, responseId } = await askGemini(input);
      console.log(`\nGemini: ${text}`);
      console.log(`(response id: ${responseId})\n`);
    } catch (error) {
      console.error("Error:", error.message);
    }

    askQuestion();
  });
}

askQuestion();
