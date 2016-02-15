import Hapi from 'hapi';
import ROT13 from 'rot13-transform'; //cypher
import FS from 'fs';

const server = new Hapi.Server();
server.connection({
  port: Number(process.argv[2]) || 8080,
  host: 'localhost'
});

server.route({
  path: '/',
  method: 'GET',
  handler: (res, rep) => {
    let file = FS.createReadStream('../public/input.txt');
    rep(file.pipe(ROT13()));
  }
});

server.start( () => {
  console.log('Server is running at:', server.info.uri);
});
