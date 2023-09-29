let express = require('express');
let cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config()

let app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

let filename;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Create a POST route for file uploads
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extract file information
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };

  res.json(fileInfo);
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
