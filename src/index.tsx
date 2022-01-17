import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({

  models: {
    user: Model,
  },

  seeds(server) {
    server.db.loadData({
      users: [
        {
          id: 1,
          codigo: '64279',
          nome: 'Douglas',
          data_nascimento: new Date('2001-02-12 09:00:00'),
          image: 'userImage.jpeg'
        },
        {
          id: 2,
          codigo: '45627',
          nome: 'Túlio',
          data_nascimento: new Date('1997-02-12 09:00:00'),
          image: 'userImage.jpeg'
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/users', () => {
      return this.schema.all('user');
    })

    this.post('/users', (schema, req) => {
      const data = JSON.parse(req.requestBody);

      return schema.create('user', data);
    })

    // this.put('/users/:id', (schema: any, req) => {
    //   console.log("req do mirage", req.requestBody);
    //   let dados = schema.user.find(':id');
      
    //   return dados.update(JSON.parse(req.requestBody));
    //   // return [];
    // })

    this.passthrough();

  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
