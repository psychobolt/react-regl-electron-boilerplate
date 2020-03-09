import Sequelize, { Op } from 'sequelize';

import sequelize from 'persistence/sequelize';
import LayoutModel from 'persistence/sequelize/models/layout';

const Layout = LayoutModel(sequelize, Sequelize);

const AppStore = SubType => class extends SubType {
  getStoreInfo = () => [
  ];

  getLayout = () => Layout.findAll();

  saveLayout = layout => Layout.bulkCreate(layout, {
    updateOnDuplicate: ['i', 'w', 'h', 'x', 'y'],
    returning: true,
  })

  deleteLayout = ids => Layout.destroy({ where: { i: { [Op.in]: ids } } })
};

export default BaseType => [
  AppStore,
  BaseType,
].reduceRight((SuperType, Extend) => Extend(SuperType));
