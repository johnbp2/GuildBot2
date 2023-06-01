// import { createRequire } from "module";
// const require = createRequire(import.meta.url); // construct the require method

const discord = require("discord.js");
const estHelper = require("../../timeZoneHelper.cjs");
const config = require("../../config.json");

exports.commandEST = {
  data: new discord.SlashCommandBuilder()
    .setName("est")
    .setDescription("Replies with ".concat(config.est)),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    // console.log("Timest");
    const message = estHelper.getESTTimeZone(new Date(), "America/New_York");
    // console.log("Message: ".concat(message.toString()));
    await interaction.editReply(config.est.concat(["  ", message.toString()]));
  },
};
