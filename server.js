var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// mongoose.connect('mongodb://localhost/ManualAuth');
//mongoose.connect('mongodb+srv://hulk:hulk@cluster0.b4gkx.mongodb.net/ManualAuth?retryWrites=true&w=majority');
//const URI="mongodb+srv://test:test@cluster0.3ornr.mongodb.net/test?retryWrites=true&w=majority";
const URI="mongodb+srv://test:test@cluster0.3ornr.mongodb.net/ManualAuth?retryWrites=true&w=majority";
//const URI="mongodb://localhost:27017/test1";




const connectDB=async()=>{
    await mongoose.connect(process.env.MONGODB_URI  || URI,{ useNewUrlParser: true,useUnifiedTopology: true  });
    console.log("DB CONNECTED");

}
connectDB();

// var db=connectDB();
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
// });


// app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false,
//   store: new MongoStore({
//     mongooseConnection: db
//   })
// }));

app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

var index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});


// listen on port 3000
app.listen(3000, () => {
  console.log('Express app listening on port 3000');
});