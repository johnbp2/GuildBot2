import { SlashCommandBuilder } from "discord.js";

export const commandEST = {
  data: new SlashCommandBuilder()
    .setName("timest")
    .setDescription("Replies with EST"),
  async execute(interaction) {
    await interaction.reply("fuck");
  },
};
