import Hapi from 'hapi';
import Vision from 'vision';
import Handlebars from 'handlebars';

const server = new Hapi.Server();
server.connection({
  port: Number(process.argv[2]) || 8080,
  host: 'localhost'
});

server.register(Vision, (err) => {
  if(err) throw(err);
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
  path: '../templates',
  helpersPath: 'helpers'
} );


server.start( () => {
  console.log('Server is running at:', server.info.uri);
});