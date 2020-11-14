const url = 'mongodb+srv://pratvar:<password>@cluster0.eryn5.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

import dns from 'dns';