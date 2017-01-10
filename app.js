let express = require('express'),
    path = require('path'),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 8080;

//handling routes
let routes = require('./routes/index');
app.use('/', routes);


//view engines
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views/layout');
app.set('view engine', 'html');

//public files
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views/layout')));


app.listen(port,function(){
    console.log('The fronted server is running at port:' + port);
});
