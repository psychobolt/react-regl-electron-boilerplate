module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Layouts', {
    i: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    h: {
      type: Sequelize.DECIMAL,
    },
    w: {
      type: Sequelize.DECIMAL,
    },
    x: {
      type: Sequelize.DECIMAL,
    },
    y: {
      type: Sequelize.DECIMAL,
    },
    isDraggable: {
      type: Sequelize.BOOLEAN,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Layouts'),
};
