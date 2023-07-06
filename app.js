const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//DB config
const db = require('./config/keys').MongoURI;

//Mongo DB Connection
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

//ejs is used as a view engine and embed the code with html
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body Parser
app.use(express.urlencoded({ extended: false }));

//index.js Route
app.use('/', require('./routers/index.js'));

//user.js Route
app.use('/users', require('./routers/users.js'));



app.listen(PORT, console.log(`The App is started on server ${PORT}`));
