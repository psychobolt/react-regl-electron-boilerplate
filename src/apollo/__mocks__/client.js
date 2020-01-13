import { createMockClient } from 'mock-apollo-client';

const data = {
};

class Database {
}

export const database = new Database(data);

const client = createMockClient();

export default client;
