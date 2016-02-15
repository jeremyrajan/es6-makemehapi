import Hapi from 'hapi';
import Joi from 'joi';


const server = new Hapi.Server();
server.connection({
  port: Number(process.argv[2]) || 8080,
  host: 'localhost'
});

server.route({
  path: '/chickens/{breed}',
  method: 'GET',
  handler: (request, reply) =>{
    reply('You asked for the chicken ' + request.params.breed);
  },
  config: {
    validate: {
      params: {
        breed: Joi.string().required()
      }
    }
  }
});


server.start( () => {
  console.log('Server is running at:', server.info.uri);
});