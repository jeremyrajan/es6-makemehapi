import Hapi from 'hapi';
import H2o2 from 'h2o2';

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2]) || 8080
});

server.register(H2o2, (err) => {
  if(err) throw(err);
});

server.route({
  path: '/proxy',
  method: 'GET',
  handler:{
    proxy:{
      host: 'localhost',
      port: 65535
    }
  }
});

server.start( () => {
  console.log('Server is running at:', server.info.uri);
});
