import type { BunFile } from "bun";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";


export async function retriever(file: BunFile): Promise<VectorStoreRetriever> {
  // Loader
  const loader = new PDFLoader(file)
  const docs = await loader.load()
  
  // Splitter
  const splitter = new RecursiveCharacterTextSplitter()
  const splits = splitter.splitDocuments(docs)

  // Vector store
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings()
  )

  return vectorStore.asRetriever()
}


// Combine docs

