var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use('/', express.static(__dirname));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});


copy(JSON.stringify(JSON.parse(document.getElementById('response_body').innerText.replace(/\s\s+/g, '')), null, ' '))