import { randomUUID } from "crypto";

const store = new Map();

export function storeResponse(prompt, response) {
  const id = randomUUID();

  store.set(id, {
    id,
    prompt,
    response,
    createdAt: new Date(),
  });

  return id;
}

export function getResponseById(id) {
  return store.get(id);
}
