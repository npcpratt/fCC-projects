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
  console.log(host);
  dns.lookup(host, (err) => {
    console.log(err);
    // check if valid URL
    if (err || /https?:\/\//.test(req.body.url) == false)
    res.send({error: 'invalid url'});
    else {
      // check if URL already exists in database
      URL.find({url: req.body.url}, (err, docs) => {
        console.log(docs);
        if(err) return console.error(err);
        if(docs !== []) {
          res.send({original_url: req.body.url, short_url: docs[0]._id});
        } else {
        // if not, create new record for URL
          let urlObj = new URL({url: req.body.url});
          urlObj.save((err) => {
            if(err) return console.error(err);
            URL.nextCount((err, count) => {
              res.send({original_url: req.body.url, short_url: count});
            });
          })
        }
      })
    }
  })
});