export function estimateTokens(text = "") {
  return Math.ceil(text.length / 4);
}

export function estimatePromptCost(prompt, response = "") {
  const inputTokens = estimateTokens(prompt);
  const outputTokens = estimateTokens(response);

  return {
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
  };
}