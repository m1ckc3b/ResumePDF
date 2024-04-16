import { ChatOpenAI } from "langchain/chat_models/openai";


export const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: "gpt-3.5-turbo"
})