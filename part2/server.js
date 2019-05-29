var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var fs = require('fs')

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.post('/create/:name/:age', function(req,res) {
  var thingy = {
    'name': req.params.name,
    'age': req.params.age
  }
  let current = fs.readFileSync(`./part2/storage.json`)
  current = JSON.parse(current)
  current.push(thingy)
  fs.writeFileSync(`./part2/storage.json`, JSON.stringify(current))
  res.json(current)
});

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/storage.json`)
});

app.get('/:name', function (req, res) {
  var info = fs.readFileSync(`${__dirname}/storage.json`)
  arr = JSON.parse(info)
  result = 400
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name === req.params.name) {
      result = arr[i]
    }
    res.send(result)
  }
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
