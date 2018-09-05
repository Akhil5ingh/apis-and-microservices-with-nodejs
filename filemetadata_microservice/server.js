var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var validUrl = require('valid-url');



app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

//the array where we keep the url shortcuts
var url_shortcuts = ["https://www.google.com","https://www.youtube.com"];


//get new url from the page's form
var createShortcut = require('./app.js').createAndSaveShortcut;
app.post('/api/shorturl/new/',function(req,res,next){
  
  var url = req.body.url;
  if (validUrl.isUri(url)){
    
     url_shortcuts.push(url);
     res.json({"original_url":url,"short_url":url_shortcuts.indexOf(url)});
    
  } else {
    res.json({"error":"invalid URL"});
  }
  
});


//get url shortcut and redirect to the corresponding url
app.get('/api/shorturl/:short',function(req,res,next){
  var short = req.params.short;
  var index=Number(short);
   
  if (index<url_shortcuts.length) {
    var original_url=url_shortcuts[index];
    res.redirect(original_url);
  } else {
    res.json({"error": "shortcut does not exist"});
  }
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});