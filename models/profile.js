module.exports = function(sequelize, DataTypes) {
    var Profile = sequelize.define("Profile", {
      height: DataTypes.STRING,
      weight: DataTypes.STRING,
      age: DataTypes.STRING,
      activity: DataTypes.STRING,
      goal: DataTypes.STRING
    });
    return Profile;
  };