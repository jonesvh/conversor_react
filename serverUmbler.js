var express = require('express');
var app = express();

//... your code here ...
                                
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});

app.get('/*', function (req, res) {
    console.log(__dirname)
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});