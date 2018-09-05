var express = require('express');
var app = express();

var bodyParser = require("body-parser");

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200})); 


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//get date parameter
app.get('/api/timestamp/:date',function(req,res,next){
  
  var date = req.params.date;
  
  var unixDate = null;
  var utcDate = "Invalid Date";
  
  if(isNaN(date)){
    utcDate = new Date(date).toUTCString();
    unixDate = new Date(date).getTime()/1000;
  } 
  res.json({unix: unixDate, utc: utcDate});
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});