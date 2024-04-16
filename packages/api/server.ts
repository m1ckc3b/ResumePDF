import express from "express"
import cors from "cors"
import { upload } from "./middlewares/multer-config"
import main from "./llm";
import { file } from "bun";
import type { uploadFilde } from "./types/uploadfile";

const app = express()
// app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.get('/api', async (req: Request, res: Response)=> {
  res.send("Hello from ResumePDF ")
})

app.post("/api", upload.single('file'), async (req: Request, res: Response) => {
  const { question } = req.body
  const file: uploadFilde = req.file
  
  // Call LLM main function
  const result = await main(question, file)

  res.send(result)
})

app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`))
