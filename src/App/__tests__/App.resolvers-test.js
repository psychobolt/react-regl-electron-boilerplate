import { DataSource } from 'apollo-datasource';
import Sequelize from 'sequelize-mock';

import { getLayout } from '../App.selectors';
import initialState from '../App.state';

let Layout;
let config;

const getQuery = () => require('../App.resolvers').Query; // eslint-disable-line global-require
const getMutation = () => require('../App.resolvers').Mutation; // eslint-disable-line global-require

beforeEach(() => {
  jest.resetModules();
  const sequelize = new Sequelize();
  Layout = sequelize.define('Layout', {
    i: 'blank',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    isDraggable: false,
  });
  jest.doMock('persistence/sequelize', () => sequelize);
  jest.doMock('persistence/sequelize/models/layout', () => () => Layout);

  const { default: store } = require('../App.store'); // eslint-disable-line global-require
  const Store = store(DataSource);
  config = {
    dataSources: {
      store: new Store(),
    },
  };
});

afterEach(() => {
  Layout.$queryInterface.$clearResults();
});

describe('App query resolvers', () => {
  it('should get store info', () => getQuery().getStoreInfo(undefined, {}, config).then(infos => expect(infos).toEqual([])));
  it('should get layout', () => getQuery().getLayout(undefined, {}, config).then(layout => expect(layout.length).toBe(1)));
});

describe('App mutation resolvers', () => {
  describe('should save layout', () => {
    it('successfully', () => getMutation().saveLayout(undefined, { layout: getLayout(initialState) }, config).then(({ success }) => expect(success).toBe(true)));
    it('unsuccessfully', () => {
      Layout.$queryInterface.$queueFailure('Fail');
      return getMutation().saveLayout(undefined, { layout: [] }, config)
        .then(({ success }) => expect(success).toBe(false));
    });
  });

  describe('should delete layout', () => {
    it('successfully', () => getMutation().deleteLayout(undefined, { ids: [] }, config).then(({ success }) => expect(success).toBe(true)));
    it('unsuccessfully', () => {
      Layout.$queryInterface.$queueFailure('Fail');
      return getMutation().deleteLayout(undefined, { ids: [] }, config)
        .then(({ success }) => expect(success).toBe(false));
    });
  });
});
