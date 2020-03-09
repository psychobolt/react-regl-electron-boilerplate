import log from 'electron-log';

export const Query = {
  getStoreInfo: async (_, variables, { dataSources }) => dataSources.store.getStoreInfo(),

  getLayout: async (_, variables, { dataSources }) => dataSources.store.getLayout()
    .then(collection => collection.map(model => model.toJSON())),
};

export const Mutation = {
  saveLayout: (_, { layout }, { dataSources }) => dataSources.store.saveLayout(layout)
    .then(collection => ({
      code: 200,
      success: true,
      message: 'The layout has been saved',
      layout: collection.map(model => model.toJSON()),
    }))
    .catch(error => {
      log.error('Failed to save layout in database');
      log.debug(error);
      return {
        code: 500,
        success: false,
        message: 'Layout was not saved. Please check application logs for details.',
      };
    }),

  deleteLayout: (_, { ids }, { dataSources }) => dataSources.store.deleteLayout(ids)
    .then(() => ({
      code: 200,
      success: true,
      message: 'Successfully removed layout configurations',
    }))
    .catch(error => {
      log.error('Failed to delete layout configurations in database');
      log.debug(error);
      return {
        code: 500,
        success: false,
        message: 'Failed to remove layout configurations. Please check application logs for details.',
      };
    }),
};
