export const Query = {
  getStoreInfo: async (_, variables, { dataSources }) => dataSources.store.getStoreInfo(),
};

// export const Mutation = {
// };
