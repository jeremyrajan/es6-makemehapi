import Hapi from 'hapi';
import Inert from 'inert';
import Path from 'path';

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: Number(process.argv[2]) || 8080
});

server.register(Inert, (err) => {
  if(err) throw err;
});

server.route( {path: '/{file}', method: 'GET', 
  handler: {
    directory: { 
      path: '../templates' 
    }
  }
});

server.start( () => {
  console.log('Server is running at:', server.info.uri);
});
