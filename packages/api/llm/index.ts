
/**
 * Architecture
 * 1. Indexing (a pipeline for ingesting data from a source and indexing it)
 *    - Loading data -> DocumentLoaders
 *    - Splitting data -> TextSplitters
 *    - Embedding data -> Embeddings
 *    - Storing data -> VectorStore
 * 2. Retrieval
 *    - Retrieving data from vector store -> Retriver
 * 3. Generation
 *    - Answering question using aprompt that includes question and retrieved data -> ChatModel/LLM
 */

import type { Document } from "langchain/document";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { prompt } from "./prompt";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { model } from "./model";
import { StringOutputParser } from "langchain/schema/output_parser";
import { RunnablePassthrough, RunnableSequence } from "langchain/runnables";
import type { uploadFilde } from "../types/uploadfile";

export default async function main(question: string, file: uploadFilde): Promise<String> {
  // Loading data -> DocumentLoaders
  const loader = new PDFLoader(file.path)
  const docs = await loader.load()
  console.log("after Loading data")
  

  // Splitting data -> TextSplitters
  const textSplitters = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  })
  const splits = await textSplitters.splitDocuments(docs)
  console.log("after splitting data");
  

  // Embedding data -> Embeddings + Storing data -> VectorStore
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings()
  )

  // Retrieving data from vector store -> Retriver
    const retriever = vectorStore.asRetriever()

  // Answering question using aprompt that includes question and retrieved data -> ChatModel/LLM
  const chain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough()
    },
    prompt,
    model,
    new StringOutputParser()
  ])

  const response = await chain.invoke(question)
  return response

}

async function formatDocumentsAsString(documents: Document[]): Promise<string> {
  return documents.map(doc => doc.pageContent).join("\n")
}
// async function createDocumentsFromPDF(file: File): Promise<Document[]> {
  
// }