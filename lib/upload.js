import Hapi from 'hapi';


const server = new Hapi.Server();
server.connection({
  port: Number(process.argv[2]) || 8080,
  host: 'localhost'
});

server.route({
  method: 'POST',
  path: '/upload',
  config:{
    handler: (request, reply) =>{
      let body = '';
      request.payload.file.on('data', (data) => {
        body += data;
      });
      request.payload.file.on('end', () => {
        var result = {
          description: request.payload.description,
          file: {
            data: body,
            filename: request.payload.file.hapi.filename,
            headers: request.payload.file.hapi.headers
          }
        };
        reply(JSON.stringify(result));
      });
    },
   payload: {
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data'
    } 
  }
});



server.start( () => {
  console.log('Server is running at:', server.info.uri);
});