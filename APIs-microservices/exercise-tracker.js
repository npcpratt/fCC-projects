const userSchema = new Schema({
  username: String,
});
const User = mongoose.model('User', userSchema);
const exerciseSchema = new Schema({
  username: String,
  date: Date,
  duration: Number,
  description: String
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

app.post('/api/exercise/new-user', (req, res) => {
  User.findOne({username: req.body.username}).exec((err, doc) => {
    if(err) return console.error(err);
    if(doc !== null) {
      res.send('Username already taken');
    } else {
      let user = new User({username: req.body.username});
      user.save(err => {
        if(err) return console.error(err);
        res.json({username: user.username, _id: user._id});
      });
    }
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
            date: exercise.date
          });
      })
    } else res.send('User does not exist')
  });
});