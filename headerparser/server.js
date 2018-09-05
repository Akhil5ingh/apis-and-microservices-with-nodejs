// init project
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/', function (req, res) {
    var ip = req.headers['host']; 
    var lang = req.headers["accept-language"];
    var soft = req.headers["user-agent"];
    var obj = {
        "ipaddress":ip.slice(0, ip.indexOf(":")),
        "language":lang.slice(0, lang.indexOf(",")),
        "software":soft.slice(soft.indexOf("(") + 1, soft.indexOf(")"))
    };
    res.send(obj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
