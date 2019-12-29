const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');

// app.use(morgan('combined'));

app.use(bodyParser.json({
  limit: '128mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

var listener = app.listen(process.env.PORT || 80, function() {
    console.log('listening on port ' + listener.address().port);
});

var routes = require('./routes/index');
app.use('/', routes);