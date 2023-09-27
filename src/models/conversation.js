"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversation.hasMany(models.Message, { foreignKey: "conversationId" });
      Conversation.belongsTo(models.User, { foreignKey: "createdBy" });
      Conversation.belongsToMany(models.User, { through: "Participant" });
    }
  }
  Conversation.init(
    {
      title: DataTypes.STRING,
      conversationImage: DataTypes.STRING,
      type: DataTypes.ENUM("single", "group"),
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Conversation",
      timestamps: true,
      updatedAt: false,
    }
  );
  return Conversation;
};
