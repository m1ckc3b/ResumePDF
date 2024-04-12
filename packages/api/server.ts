import express from "express"
import cors from "cors"
import multer from "multer"

const app = express()
// app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const upload = multer({ dest: "uploads/"})

app.get('/api', async (req:Request, res: Response) => {
  res.send("Hello from ResumePDF ")
})

app.post("/api", upload.single("file"), (req: Request, res: Response) => {

  const question = req.body.question
  const file = req.file

  res.send("Data received")
  
})

app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`))
