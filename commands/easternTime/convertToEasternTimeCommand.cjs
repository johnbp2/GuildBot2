const discord = require("discord.js");
const estHelper = require("../../timeZoneHelper.cjs");
const config = require("../../config.json");

exports.commandEST = {
  data: new discord.SlashCommandBuilder()
    .setName("convertest")
    .setDescription(
      "Replies with the specified time converted to ".concat(config.est)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    // console.log("Timest");
    const message = estHelper.getESTTimeZone(new Date(), config.timeZoneName);
    // console.log("Message: ".concat(message.toString()));
    await interaction.editReply(config.est.concat([": ", message.toString()]));
  },
};
