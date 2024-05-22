import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      console.log("UPLOADING")
      console.log(__dirname, file);
      // cb(null, 'uploads/');
      cb(null, `${__dirname}../../../tmp/uploads/`);
    } catch (error) {
      console.log("Error on file", error);
      throw error
    }
  },
  filename: (req, file, cb) => {
    try {
      cb(null, Date.now() + '-' + file.originalname);
    } catch (error) {
      console.error("Error writting file", error);
      throw error
    }
  }
});

const upload = multer({ storage: storage });

export default upload;

