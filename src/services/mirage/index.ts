import { createServer, Factory, Model } from 'miragejs';
import * as faker from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  create_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i) {
          return `Usuário ${i + 1}`;
        },
        email() {
          return faker.faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList('user', 20);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
}
