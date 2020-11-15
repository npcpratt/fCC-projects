const url = 'mongodb+srv://pratvar:<password>@cluster0.eryn5.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dns = require('dns');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/shorturl/new', (req, res) => {
  let host = req.body.url.replace(/^(https?:\/\/)?(www.)?/, '');
  console.log(host);
  dns.lookup(host, 6, (err) => {
    console.log(err);
    if (err || /https?:\/\//.test(req.body.url) == false)
    res.send({error: 'invalid url'});
    else res.send({original_url: req.body.url, short_url: ''});
  })
})