import Hapi from 'hapi';

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: Number(process.argv[2]) || 8080
});

const myHandler = (request, reply) => {
  reply('Hello hapi');
};

server.route( {path: '/', method: 'GET', handler: myHandler});

server.start( () => {
  console.log('Server is running at:', server.info.uri);
});