// import { createRequire } from "module";
// const require = createRequire(import.meta.url); // construct the require method

const discord = require("discord.js");

exports.commandEST = {
  data: new discord.SlashCommandBuilder()
    .setName("timest")
    .setDescription("Replies with EST"),
  async execute(interaction) {
    await interaction.reply("fuck");
  },
};
