Emit objects to a socket via stream.

## Usage

##### Client:

```javascript
var socketStream = require('../lib');

var bunyan = require('bunyan');

var logger = bunyan.createLogger({
  name: 'test',
  streams: [{
    level: 'debug',
    stream: new socketStream({
      host: 'localhost', // defaults
      port: 8000,
      eventName: 'log'
    });
  }]
});

setInterval(function () {
  logger.info('Testing.');
}, 1000)
```

##### Server:

```javascript
var server = require('http').createServer();
var io = require('socket.io').listen(server, {'log level': 0});
server.listen(8000);

io.sockets.on('connection', function (socket) {
    console.log('connected');

    socket.on('log', function (req) {
        console.log(req.data); // Bunyan data here
    })
});
```
