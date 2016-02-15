import Hapi from 'hapi';
import Joi from 'joi';

const server = new Hapi.Server();
server.connection({
  port: Number(process.argv[2]) || 8080,
  host: 'localhost'
});

server.route({
  path: '/login',
  method: 'POST',
  handler: (request, reply) => {
    reply('login successful');
  },
  config: {
    validate:{
      payload: Joi.object({
        isGuest: Joi.boolean().required(),
        username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
        password: Joi.string().alphanum(),
        accessToken: Joi.string().alphanum()
      })
      .options({allowUnknown: true})
      .without('password', 'accessToken')
    }
  }
});


server.start( () => {
  console.log('Server is running at:', server.info.uri);
});