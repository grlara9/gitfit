module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    name: DataTypes.STRING,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    goal: DataTypes.STRING,
    activity: DataTypes.STRING,
    sex: DataTypes.STRING
  });
  return Example;
};
