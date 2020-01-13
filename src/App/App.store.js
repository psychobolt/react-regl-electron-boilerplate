const AppStore = SubType => class extends SubType {
  getStoreInfo = () => [
  ];
};

export default BaseType => [
  AppStore,
  BaseType,
].reduceRight((SuperType, Extend) => Extend(SuperType));
