import multer from "multer"

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req: Express.Request, file: Express.Multer.File, callback: Function): void => {
    callback(null, 'uploads')
  },
  filename: (req: Express.Request, file: Express.Multer.File, callback: Function): void => {
    const name = file.originalname.split(' ').join('_')
    callback(null, name)
  }
});

export const upload = multer({storage: storage})
