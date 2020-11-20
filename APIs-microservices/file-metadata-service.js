var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.post('/api/fileanalyse', upload.none(), (req, res) => {
  res.json(req.body)
})
