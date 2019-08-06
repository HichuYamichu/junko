const net = require('net');
const { EventEmitter } = require('events');
const PORT = 1234;
const HOST = 'localhost';

class Server extends EventEmitter {
  constructor(port, address) {
    super();
    this.node;
    this.port = port || PORT;
    this.address = address || HOST;

    this.init();
  }

  init() {
    const onClientConnected = sock => {
      this.node = sock;
      const clientName = `${sock.remoteAddress}:${sock.remotePort}`;
      console.log(`new client connected: ${clientName}`);

      sock.on('data', data => {
        this.emit('guild', data);
        // console.log(`${clientName} Says: ${data}`);
        // sock.write(data);
        sock.write('exit');
      });

      sock.on('close', () => {
        console.log(`connection from ${clientName} closed`);
      });

      sock.on('error', err => {
        console.log(`Connection ${clientName} error: ${err.message}`);
      });
    };

    this.connection = net.createServer(onClientConnected);

    this.connection.listen(PORT, HOST, () => {
      console.log(`Server started at: ${HOST}:${PORT}`);
    });
  }
}
module.exports = Server;
