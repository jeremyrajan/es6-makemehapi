import Hapi from 'hapi';
import HapiAuth from 'hapi-auth-basic';

let user = { name: 'hapi', password: 'auth' };
const server = new Hapi.Server();
server.connection({
  port: Number(process.argv[2]) || 8080,
  host: 'localhost'
});

const validate = (request, username, password, callback) => {
  let isValid = username === user.name && password === user.password;

  return callback(null, isValid, { name: user.name });
};


server.register(HapiAuth, (err) => {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'simple',
            handler: (request, reply) => {
                reply();
            }
        }
    });

    server.start( () => {
      console.log('Server is running at:', server.info.uri);
    });
});