const userSchema = new Schema({
  username: String,
});
const User = mongoose.model('User', userSchema);

const exerciseSchema = new Schema({
  userId: String,
  username: String,
  date: Date,
  duration: Number,
  description: String
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

app.post('/api/exercise/new-user', (req, res) => {
  User.findOne({username: req.body.username}, (err, doc) => {
    if(err) return console.error(err);
    if(doc == null) {
      let user = new User({username: req.body.username});
      user.save(err => {
        if(err) return console.error(err);
        res.json({username: user.username, _id: user._id});
      });
    } else res.send('Username already taken');
  });
});

app.get('/api/exercise/users', (req,res) => {
  User.find({}, (err, docs) => {
    if(err) return console.error(err);
    res.json(docs);
  });
});

app.post('/api/exercise/add', (req, res) => {
  User.findOne({_id: req.body.userId}, (err, doc) => {
    if(err) return console.error(err);
    if (doc !== null) {
      if(err) return console.error(err);
      let date = new Date();
      if(req.body.date) date = req.body.date;
      let exercise = new Exercise({
      userId: req.body.userId,
      username: doc.username,
      description: req.body.description,
      duration: req.body.duration,
      date: date
      });
      exercise.save(err => {
        if(err) return console.error(err);
          res.json({
            _id: req.body.userId,
            username: doc.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString()
          });
      });
    } else res.send('Unknown userId');
  });
});

app.get('/api/exercise/log', (req, res) => {
  Exercise.find({userId: req.query.userId})
  .sort({date: 1})
  .limit(req.query.limit ? parseInt(req.query.limit) : 0)
  .exec((err, docs) => {
    if(err) return console.error(err);
    if(docs !== null) {
      let filteredDocs = docs;
      if(req.query.from) {
        let fromDate = new Date(req.query.from);
        filteredDocs = docs.filter(item => {
          return item.date >= fromDate;
        });
      }
      if(req.query.to) {
        let toDate = new Date(req.query.to);
        filteredDocs = docs.filter(item => {
          return item.date <= toDate;
        })
      }
      if(filteredDocs.length > 0) {
        console.log(filteredDocs)
        res.json({
        _id: req.query.userId,
        username: filteredDocs[0].username,
        count: docs.length,
        log: filteredDocs.map(item => {
              return {
                description: item.description,
                duration: item.duration,
                date: item.date.toDateString()
              }
            })
        });
      } else res.send('No data available');
    } else res.send('Unknown userId');
  });
});