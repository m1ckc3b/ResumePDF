import { PromptTemplate } from "langchain/prompts";


export const prompt = PromptTemplate.fromTemplate(`
  Tu es un assistant qui résume les documents fournit {context}.
  Tu dois répondre à la question {question} de façon verbeuse.
`)