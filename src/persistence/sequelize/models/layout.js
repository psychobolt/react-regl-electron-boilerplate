module.exports = (sequelize, DataTypes) => {
  const Layout = sequelize.define('Layout', {
    i: { type: DataTypes.STRING, primaryKey: true },
    h: DataTypes.DECIMAL,
    w: DataTypes.DECIMAL,
    x: DataTypes.DECIMAL,
    y: DataTypes.DECIMAL,
    isDraggable: DataTypes.BOOLEAN,
  }, {
    timestamps: false,
  });
  // Layout.associate = models => {
    // associations can be defined here
  // };
  return Layout;
};
