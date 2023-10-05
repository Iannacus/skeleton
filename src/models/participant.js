"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participant.belongsTo(models.User, { foreignKey: "UserId" });
      Participant.belongsTo(models.Conversation, {
        foreignKey: "ConversationId",
      });
    }
  }
  Participant.init(
    {
      UserId: DataTypes.INTEGER,
      ConversationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Participant",
      timestamps: false,
    }
  );
  return Participant;
};
