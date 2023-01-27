const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
app.use(cors());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/audio/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

//get hello world
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('audio'), (req, res) => {
    console.log(req.file);
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Get the audio file
  const audio = req.file;

  // Return a public URL for the audio file
  const publicURL = `http://localhost:3000/audio/${audio.filename}`;
  res.send({ publicURL });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
