var multer  = require('multer')
var upload = multer()

app.post('/api/fileanalyse', upload.none(), (req, res) => {
  app.use('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    })
  })
  