let express = require('express'),
    path = require('path'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    validator = require('express-validator'),
    session = require('express-session'),
    MySQLStore = require('express-mysql-session')(session),
    hbs =  require('express-handlebars'),
    port = process.env.PORT || 8080;


//public files
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));

//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());
app.use(cookieParser());

//set up session and cookies
let options = {
    host: 'localhost',
    user     : 'project',
    password : 'Project',
    database : 'LMS'
};
let sessionStore = new MySQLStore(options);
app.use(session({
   store: sessionStore,
   secret: "test",
   saveUninitialized: true,
   resave: false
 })
);

//handling routes
let routes = require('./routes/index');
let teacher = require('./routes/teacher');
let student = require('./routes/student');
let course = require('./routes/course');
app.use('/', routes);
app.use('/teacher', teacher);
app.use('/student', student);
app.use('/course', course);

//view engines
app.engine('handlebars',  hbs({defaultLayout: 'main',
                               layoutsDir: __dirname + '/views/layout',
                               helpers: {
                                   section: function(name, options){
                                       if(!this._sections) this._sections = {};
                                       this._sections[name] = options.fn(this);
                                       return null;
                                   }
                               }}));
app.set('view engine', 'handlebars');

app.listen(port,function(){
    console.log('The frontend server is running at port:' + port);
});
