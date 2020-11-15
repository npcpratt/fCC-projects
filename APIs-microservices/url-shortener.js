const bodyParser = require('body-parser');
const dns = require('dns');

const mongoose = require('mongoose');
const { Schema } = mongoose;
const url = 'mongodb+srv://pratvar:<password>@cluster0.eryn5.mongodb.net/urlDB?retryWrites=true&w=majority';
const connection = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

const urlSchema = new Schema({
  url: String
})
urlSchema.plugin(autoIncrement.plugin, 'URL');
const URL = connection.model('URL', urlSchema);

app.use(bodyParser.urlencoded({extended: false}));
app.post('/api/shorturl/new', (req, res) => {
  let host = req.body.url.replace(/^(https?:\/\/)?(www.)?/, '');
  dns.lookup(host, (err) => {
    // check if valid URL
    if (err || /https?:\/\//.test(req.body.url) == false)
      res.send({error: 'invalid url'});
    else {
      // check if URL already exists in database
      URL.findOne({url: req.body.url}).exec((err, doc) => {
        if(err) return console.error(err);
        if(doc !== null) {
          res.json({original_url: req.body.url, short_url: doc._id});
        } else {
          // if not, create new record for URL
          let urlObj = new URL({url: req.body.url});
          urlObj.save((err) => {
            if(err) return console.error(err);
              res.json({original_url: req.body.url, short_url:urlObj._id});
          });
        }
      })
    }
  })
});
app.get('/api/shorturl/:id', (req, res) => {
  URL.findOne({_id: req.params.id}).exec((err, doc) => {
    if(err) return console.error(err);
    if(doc !== null) res.redirect(doc.url);
    else res.send('Not found');
  })
});