var util = require('util');
var io = require('socket.io-client');
var Duplex = require('stream').Duplex;
util.inherits(socketStream, Duplex);

function socketStream(opt) {
  opt = opt || {objectMode: true};

  Duplex.call(this, opt);
  this._readableState.objectMode = true;
  this._writableState.objectMode = true;

  this._host = opt.host || 'localhost';
  this._port = opt.port || 8000;
  this._eventName = opt.eventName || 'log';

  this.socket = io.connect(util.format('http://%s:%s', this._host, this._port));
}

socketStream.prototype._write = function (chunk, encoding, done) {
  if (this.socket.connected) {
    this.socket.emit(this._eventName, {data: chunk});
    done();
  } else {
    done(new Error('Failed to connect to socket.'));
  }
}

module.exports = socketStream;
