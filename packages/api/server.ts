import express from "express"
import cors from "cors"
import { upload } from "./src/middlewares/multer-config"

const app = express()
// app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.get('/api', async (req: Request, res: Response) => {
  res.send("Hello from ResumePDF ")
})

app.post("/api", upload, (req: Request, res: Response) => {

  const question = req.body.question
  const file = req.file
  console.log(Bun.file(file.path));

  res.send("Data received")
  
})

app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`))
