import express from "express"
import cors from "cors"
import { upload } from "./middlewares/multer-config"
import main from "./llm";

const app = express()
// app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.get('/api', async (req: Request, res: Response)=> {
  res.send("Hello from ResumePDF ")
})

app.post("/api", upload, async (req: Request, res: Response) => {
  const {question: string, file: File} = req.body
  // Call LLM main function
  const result = await main(question, file)

  res.send(result)
})

app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`))
