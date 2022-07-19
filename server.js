var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '1429551',
  key: '64f7e20e52a20c46d3a2',
  secret: '44e8df11da7a693eb6a3',
  cluster: 'eu',
  encrypted: true
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/comment', function(req, res){
  console.log(req.body);
  var newComment = {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment
  }
  pusher.trigger('flash-comments', 'new_comment', newComment);
  res.json({  created: true });
});

// Error Handler for 404 Pages
app.use(function(req, res, next) {
    var error404 = new Error('Route Not Found');
    error404.status = 404;
    next(error404);
});

module.exports = app;

app.listen(9000, function(){
  console.log('Server on http://localhost:9000/')
});
