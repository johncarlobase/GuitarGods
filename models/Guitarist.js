module.exports = function Guitarist(sequelize, DataTypes) {
  var Guitarist = sequelize.define("Guitarist", {
    position: DataTypes.INTEGER,
    guitarist: DataTypes.STRING,
    genre: DataTypes.STRING,
    band: DataTypes.STRING
  });
  return Guitarist;
};
