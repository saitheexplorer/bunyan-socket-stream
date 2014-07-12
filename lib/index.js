var io = require('socket.io-client');
var stream = require('stream');
var util = require('util');

function socketStream(opt) {
  opt = opt || {};
  stream.Transform.call(this, opt);

  this._host = opt.host || 'localhost';
  this._port = opt.port || 8000;
  this._eventName = opt.eventName || 'log';

  this.socket = io.connect(util.format('http://%s:%s', this._host, this._port));
}

util.inherits(socketStream, stream.Transform);

socketStream.prototype._transform = function (obj, encoding, done) {
  if (this.socket.connected) {
    this.socket.emit(this._eventName, {data: obj});
    this.push(obj);
    done();
  } else {
    done(new Error('Failed to connect to socket.'));
  }
};

module.exports = socketStream;
