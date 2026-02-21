import dotenv from "dotenv";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",  
  apiKey: process.env.GEMINI_API_KEY,
});

// const response = await model.invoke("Explain closures in JavaScript in simple words.");

// console.log(response.content);
// const response = await model.batch([
//   "Explain closures in JavaScript in simple words.",
//   "What is the difference between var, let, and const?"
// ]);
// for(let i=0; i<response.length; i++){
//   console.log(response[i].content);
// } 
// const response = await model.stream("Explain closures in JavaScript in simple words.");
// for await (const part of response) {
//     console.log(part.content);
// }
// async function main() {
//     const prompt = ChatPromptTemplate.fromMessages([
//         {
//             role: "user",
//             content: "Explain closures in JavaScript in simple words."
//         }
//     ]);
//     const formattedPrompt = await prompt.format(
//         {
//             user: {
//                 name: "smriti",
//                 age: 20
//             }
//         }
//     );
//     const response = await model.invoke(formattedPrompt);
//     console.log(response.content);
// }
async function main() {
    const prompt = ChatPromptTemplate.fromTemplate(
        "What is the capital of {country}?")
    const formattedPrompt = await prompt.format({ country: "canada" });
    const response = await model.invoke(formattedPrompt);
    console.log(response.content);
}
main();