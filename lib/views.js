import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import Path from 'path';
import Handlebars from 'handlebars';

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: Number(process.argv[2]) || 8080
});

server.register([Inert, Vision], (err) => {
  if(err) throw err;
});

server.route( {path: '/', method: 'GET', 
  handler: {
    view: 'index.html'
  }
});

server.views( {
  engines: {
    html: Handlebars
  },
  path: '../templates'
} );

server.start( () => {
  console.log('Server is running at:', server.info.uri);
});