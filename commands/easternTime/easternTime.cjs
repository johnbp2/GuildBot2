// import { createRequire } from "module";
// const require = createRequire(import.meta.url); // construct the require method

const discord = require("discord.js");
const estHelper = require("../../timeZoneHelper.cjs");
exports.commandEST = {
  data: new discord.SlashCommandBuilder()
    .setName("timest")
    .setDescription("Replies with EST"),
  async execute(interaction) {
    await interaction.deferReply();
    console.log("Timest");
    const message = estHelper.getESTTimeZone(new Date(), "America/New_York");
    console.log("Message: ".concat(message.toString()));
    await interaction.editReply(message.toString());
  },
};
