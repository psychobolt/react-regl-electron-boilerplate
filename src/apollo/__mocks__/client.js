import { createMockClient } from 'mock-apollo-client';

import { getLayout } from 'App/App.selectors';
import initialState from 'App/App.state';
import { DeleteLayout, SaveLayout } from 'App/App.mutation.gql';
import query from 'App/App.query.gql';

const data = {
};

class Database {
}

export const database = new Database(data);

const client = createMockClient();

client.setRequestHandler(query, () => Promise.resolve({
  data: {
    layout: getLayout(initialState),
  },
}));

client.setRequestHandler(DeleteLayout, async () => ({
  data: {
    deleteLayout: {
      code: 200,
      success: true,
      message: 'Success',
    },
  },
}));

client.setRequestHandler(SaveLayout, async ({ layout }) => ({
  data: {
    saveLayout: {
      code: 200,
      success: true,
      message: 'Success',
      layout,
    },
  },
}));

export default client;
