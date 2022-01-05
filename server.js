const express = require('express');
const path = require('path');
const app = express();
const PORT = 3038;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log('Listening to the port ' + PORT + ' ...');
app.listen(3038);