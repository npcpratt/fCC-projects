const url = 'mongodb+srv://pratvar:<password>@cluster0.eryn5.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dns = require('dns');
const bodyParser = require('body-parser');

const urlSchema = new Schema({
  url: String
})
const UrlModel = mongoose.model('UrlModel', urlSchema);

app.use(bodyParser.urlencoded({extended: false}));
app.post('/api/shorturl/new', (req, res) => {
  let host = req.body.url.replace(/^(https?:\/\/)?(www.)?/, '');
  console.log(host);
  dns.lookup(host, 6, (err) => {
    console.log(err);
    if (err || /https?:\/\//.test(req.body.url) == false)
    res.send({error: 'invalid url'});
    else {
      
      // check if already exists in database
      let check = {exists: false, doc: null}
      const checkFunc = (done) => {
        UrlModel.find({url: req.body.url}, (err, doc) => {
          if(err) return done(err);
          else if(doc == []) done(null, doc)
          else {
            existing.docID = doc._id;
            done(null, doc);
          }
        });
      }
      checkFunc();
      if(check.exists) 
        res.send({
          original_url: req.body.url, 
          short_url: check.docID
        });
      else {
        // create new document for UrlObj model
        const createFunc = (done) => {
          let urlObj = new UrlModel({url: req.body.url});
          urlObj.save((err, data) => {
            if(err) return done(err);
            console.log(data);
            done(null, data);
          })
        }
        createFunc();
        res.send({original_url: req.body.url, short_url: ''});
      }
    }
  })
})