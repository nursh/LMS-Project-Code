let express = require('express'),
    path = require('path'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    validator = require('express-validator'),
    session = require('express-session'),
    hbs =  require('express-handlebars'),
    port = process.env.PORT || 8080;


//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());
app.use(cookieParser());
app.use(session({secret: "test", saveUninitialized: false, resave: false}));

//handling routes
let routes = require('./routes/index');
app.use('/', routes);

//view engines
app.engine('handlebars',  hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//public files
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));


app.listen(port,function(){
    console.log('The frontend server is running at port:' + port);
});
