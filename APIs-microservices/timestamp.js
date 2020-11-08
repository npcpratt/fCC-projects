app.get('/api/timestamp', (req, res) => {
  res.json({unix: Date.now(), utc: Date()})
})
app.get('/api/timestamp/:date_string', (req, res) => {
    if (/\d{5,}/.test(req.params.date_string))
      res.json({
        unix: req.params.date_string,
        utc: new Date(parseInt(req.params.date_string)).toUTCString()
      });
    let date = new Date(req.params.date_string);
    if (isNaN(date.getTime()))
      res.json({error: 'Invalid Date'});
    else
      res.json({unix: date.getTime(), utc: date.toUTCString()});
});