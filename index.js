let express = require('express');
let cors = require('cors');
const multer = require("multer");
require('dotenv').config()

let app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


let fileanalyse;
// SET STORAGE
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fileanalyse = file;
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name)
  }
})

let upload = multer({ storage: storage })

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('file'), async (req, res) => {
  if (fileanalyse) {
    res.status(200).json(fileanalyse);
  }
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
