const MAX_MESSAGES = 10; 

let conversation = [];

export function addUserMessage(message) {
  conversation.push(`User: ${message}`);
  trimContext();
}

export function addGeminiMessage(message) {
  conversation.push(`Gemini: ${message}`);
  trimContext();
}

export function getContextPrompt() {
  return conversation.join("\n");
}

function trimContext() {
  if (conversation.length > MAX_MESSAGES) {
    conversation.shift(); 
  }
}

export function resetContext() {
  conversation = [];
}
