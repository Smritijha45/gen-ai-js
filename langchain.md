# 🦜 LangChain Complete Notes (JavaScript / Node.js)

A detailed guide to understanding and using LangChain for building LLM-powered applications like:

- Chatbots
- RAG (Retrieval-Augmented Generation)
- AI Agents
- Tool-using AI systems
- Vector search applications

---

# 📌 1. What is LangChain?

LangChain is a framework for building applications powered by Large Language Models (LLMs).

It helps with:

- Prompt management
- Memory handling
- Vector stores
- RAG pipelines
- Agents & tool usage
- Structured output
- Multi-model integration

---

# 📦 2. Installation (Node.js)

```bash
npm install langchain
npm install @langchain/community
npm install dotenv
```

If using OpenAI:

```bash
npm install @langchain/openai
```

If using Gemini:

```bash
npm install @google/genai
```

---

# 🧠 3. Core Concepts

LangChain has 5 major building blocks:

1. LLMs / Chat Models
2. Prompts
3. Chains
4. Memory
5. Retrieval (Vector Stores)
6. Agents

---

# 🔹 4. Using Chat Models

## Example: OpenAI

```js
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.7,
});

const response = await model.invoke("Explain recursion simply");
console.log(response.content);
```

---

# 🔹 5. Prompts

Prompts allow structured message formatting.

```js
import { ChatPromptTemplate } from "langchain/prompts";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant."],
  ["human", "{question}"],
]);

const formattedPrompt = await prompt.format({
  question: "What is LangChain?",
});
```

---

# 🔹 6. Chains

Chains combine models + prompts.

```js
import { RunnableSequence } from "langchain/schema/runnable";

const chain = RunnableSequence.from([
  prompt,
  model,
]);

const result = await chain.invoke({
  question: "What is RAG?",
});

console.log(result.content);
```

---

# 🔹 7. Memory

Memory allows chatbot context retention.

```js
import { BufferMemory } from "langchain/memory";

const memory = new BufferMemory({
  returnMessages: true,
});
```

Used inside conversational chains.

---

# 🔹 8. Embeddings

Embeddings convert text → vector (number array).

```js
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const vector = await embeddings.embedQuery("hello world");
```

---

# 🔹 9. Vector Stores

Vector stores store embeddings for similarity search.

## MemoryVectorStore (for learning only)

```js
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";

const docs = [
  new Document({ pageContent: "LangChain is powerful" }),
];

const vectorStore = await MemoryVectorStore.fromDocuments(
  docs,
  embeddings
);

const results = await vectorStore.similaritySearch(
  "What is LangChain?",
  1
);
```

---

# 🔹 10. RAG (Retrieval-Augmented Generation)

RAG = Retrieve relevant documents + send to LLM.

## Basic RAG Flow

1. Convert documents → embeddings
2. Store in vector database
3. User asks question
4. Retrieve relevant docs
5. Pass docs + question to model
6. Generate answer

---

## Example RAG

```js
const retriever = vectorStore.asRetriever();

const retrievedDocs = await retriever.invoke("What is LangChain?");

const ragPrompt = `
Use the following context to answer:

${retrievedDocs.map(doc => doc.pageContent).join("\n")}

Question: What is LangChain?
`;

const answer = await model.invoke(ragPrompt);

console.log(answer.content);
```

---

# 🔹 11. Agents

Agents allow LLMs to use tools dynamically.

Example tools:

- Calculator
- Web search
- Database queries
- APIs

---

## Tool Example

```js
import { tool } from "langchain/tools";

const calculator = tool(
  async (input) => eval(input),
  {
    name: "calculator",
    description: "Performs math calculations",
  }
);
```

Agents decide when to call tools automatically.

---

# 🔹 12. Output Parsers

Used to structure model responses.

```js
import { StructuredOutputParser } from "langchain/output_parsers";
```

Useful for JSON output generation.

---

# 🔹 13. Streaming Responses

```js
const stream = await model.stream("Explain quantum computing");

for await (const chunk of stream) {
  process.stdout.write(chunk.content);
}
```

---

# 🔹 14. Production Vector Databases

Instead of MemoryVectorStore, use:

- Chroma
- Pinecone
- Weaviate
- Supabase
- Qdrant

Example:

```bash
npm install chromadb
```

---

# 🔥 15. Full RAG Architecture (Production)

User Question
↓
Embed Question
↓
Vector Search
↓
Retrieve Top-K Docs
↓
Send Context + Question to LLM
↓
Return Answer

---

# 🧩 16. LangChain Folder Structure (Recommended)

```
/src
 ├── models/
 ├── embeddings/
 ├── vectorstore/
 ├── chains/
 ├── agents/
 ├── prompts/
 └── index.js
```

---

# 🧠 17. When to Use LangChain?

Use it when:

- Building RAG apps
- Creating AI agents
- Managing tool workflows
- Structuring prompts at scale
- Enterprise AI systems

Avoid it if:

- Simple chatbot
- Single prompt app
- No retrieval needed

---

# 🚀 18. Advanced Topics

- Multi-agent systems
- LangGraph (state machines for agents)
- Tool routing
- Structured JSON outputs
- Conversational RAG
- Hybrid search (BM25 + embeddings)

---

# 🎯 19. Interview Important Topics

- What is RAG?
- Difference between embeddings and LLM?
- What are vector databases?
- How do agents work?
- How does memory work?
- Stateless vs stateful chains?
- Token limits?
- Context window?

---

# 🧪 20. Common Errors

- "Value must be a list"
- Import path errors (v1 vs v0)
- ESM vs CommonJS issues
- Peer dependency conflicts
- Embedding shape mismatch

---

# 📚 21. Summary

LangChain helps you:

✔ Manage prompts  
✔ Build RAG pipelines  
✔ Create AI agents  
✔ Use tools dynamically  
✔ Structure LLM workflows  


---
# 🧠 Model Context Protocol (MCP) – Complete Guide

## 📌 What is MCP?

**MCP (Model Context Protocol)** is a standardized protocol that allows AI models to connect to external tools, data sources, and systems in a structured and secure way.

Think of it as:

> 🔌 A universal adapter that lets AI models plug into tools, databases, files, APIs, and services.

It enables AI assistants to move beyond simple text responses and interact with real-world systems.

---

# 🚀 Why MCP Exists

Before MCP, integrating tools with AI required:

- Custom API wiring
- Manual schema definitions
- Tool-specific logic
- Custom prompt engineering for each tool
- Repeated integrations per project

This led to:
- Inconsistent implementations
- Complex code
- Poor scalability
- Difficult maintenance

MCP solves this by providing:

✔ A standardized way to expose tools  
✔ A structured communication protocol  
✔ A shared interface for AI systems  

---

# 🧩 Core Idea Behind MCP

Instead of writing custom integrations for each AI system:

Tool → exposes capabilities via MCP  
Model → discovers tools dynamically  
Model → calls tools in a structured way  

---

# 🏗 MCP Architecture

```
User
 ↓
AI Model
 ↓
MCP Layer
 ↓
External Tools / APIs / Databases / Files
```

---

# 🔍 What MCP Enables

With MCP, AI models can:

- 📂 Access local files
- 🗄 Query databases
- 🌐 Call external APIs
- 🧮 Perform calculations
- 📊 Retrieve structured data
- 🧠 Share contextual state between systems

---

# 🛠 Without MCP vs With MCP

## ❌ Without MCP

You manually write:

```js
const weather = await fetchWeather(city);
const prompt = `Weather data: ${weather}`;
const result = await model.invoke(prompt);
```

Every tool requires custom glue code.

---

## ✅ With MCP

The tool exposes:

```json
{
  "name": "getWeather",
  "description": "Get weather for a city",
  "parameters": {
    "city": "string"
  }
}
```

The model can automatically generate:

```json
{
  "tool_call": "getWeather",
  "arguments": { "city": "Delhi" }
}
```

And the system executes it.

---

# 🔐 Security in MCP

MCP supports:

- Permission control
- Tool scoping
- Sandboxing
- Authentication layers
- Restricted access

This prevents:
- Unauthorized API calls
- Arbitrary code execution
- Data leaks

---

# 🧠 MCP vs LangChain Tools

| Feature | MCP | LangChain Tools |
|----------|------|----------------|
| Standardized protocol | ✅ Yes | ❌ Framework-specific |
| Cross-platform | ✅ Yes | ❌ Depends on framework |
| Built-in tool discovery | ✅ Yes | Partial |
| Production-grade standard | ✅ Yes | Mostly developer utility |

LangChain tools are framework tools.
MCP is a protocol standard.

---

# 🔥 MCP vs Function Calling

| Feature | Function Calling | MCP |
|----------|------------------|-----|
| Model-specific | Yes | No |
| Standardized across systems | No | Yes |
| Tool discovery | Manual | Automatic |
| Multi-tool ecosystem | Limited | Designed for it |

Function calling = model feature  
MCP = ecosystem protocol

---

# 🏢 Where MCP is Used

MCP-style integrations are common in:

- Enterprise AI assistants
- IDE AI agents
- Tool-using AI systems
- Multi-agent architectures
- Secure AI environments
- Knowledge systems
- Autonomous agents

---

# 🧬 MCP in Agent Systems

Agents need:

1. Tools
2. Memory
3. External knowledge
4. State sharing

MCP helps standardize how these components communicate.

---

# 🏗 Example MCP Flow

1. User asks: "What's today's weather in Delhi?"
2. Model recognizes weather tool
3. Model generates tool call
4. MCP routes request to weather API
5. Tool returns structured data
6. Model generates final answer

---

# 🧠 How MCP Helps in RAG

In Retrieval-Augmented Generation:

Without MCP:
- Custom database connector
- Custom search handler

With MCP:
- Database exposes search capability via protocol
- Model uses it dynamically

---

# 🧪 When You Actually Need MCP

You need MCP if you are building:

- AI agents using multiple tools
- Enterprise AI systems
- IDE AI copilots
- Cross-model tool ecosystems
- Scalable AI infrastructure

You do NOT need MCP for:

- Simple chatbots
- Single-prompt apps
- Basic RAG projects
- Small personal tools

---

# 🏁 Summary

MCP is:

✔ A standard protocol  
✔ A tool integration framework  
✔ Designed for AI agents  
✔ Secure and scalable  
✔ Enterprise-friendly  

It helps AI systems move from:
> Text generation → Action-taking agents


---






