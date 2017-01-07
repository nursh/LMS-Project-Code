let express = require('express'),
    path = require('path'),
    app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views/html');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/views/html')));

app.get('/', function(req,res){
    res.render('Sign-in.html');
});
app.listen(3000,function(){
    console.log('The fronted server is running at port:3000')
});
