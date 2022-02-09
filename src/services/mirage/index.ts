import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from 'miragejs';
import * as faker from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  create_at: string;
};

function orderByDate(users: User[]) {
  return users.sort((a, b) => {
    return new Date(a.create_at) > new Date(b.create_at) ? 1 : -1;
  });
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    serializers: {
      application: ActiveModelSerializer,
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
      server.createList('user', 200);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        let usersDb = this.serialize(schema.all('user')).users;

        const users = orderByDate(usersDb).slice(pageStart, pageEnd);

        return new Response(200, { 'x-total-count': String(total) }, { users });
      });

      this.get('/users/:id', (schema, request) => {
        let id = request.params.id;

        //@ts-ignore
        return schema.users.find(id); // users in the second case
      });

      this.post('/users');

      this.patch('/users/:id', function (schema, request) {
        let id = request.params.id;
        let attrs = this.normalizedRequestAttrs();
        //@ts-ignore
        return schema.users.find(id).update(attrs);
      });

      this.namespace = '';
      this.passthrough('https://api.github.com/users/**');
    },
  });

  return server;
}
