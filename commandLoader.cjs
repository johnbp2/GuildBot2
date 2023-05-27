const path = require("path");
const fs = require("fs");

// exports.commandLoader = function () {
//   const commands = [];
//   const foldersPath = path.join(process.cwd(), "commands");
//   const commandFolders = fs.readdirSync(foldersPath);
//   for (const folder of commandFolders) {
//     // Grab all the command files from the commands directory you created earlier
//     const commandsPath = path.join(foldersPath, folder);
//     const commandFiles = fs
//       .readdirSync(commandsPath)
//       .filter((file) => file.endsWith(".cjs") || file.endsWith(".js"));
//     commands.push(commandFiles);
//   }

//   return commands;
// };

class commandLoader {
  loadFromCommandsFolder() {
    const commands = [];
    const foldersPath = path.join(process.cwd(), "commands");
    const commandFolders = fs.readdirSync(foldersPath);
    for (const folder of commandFolders) {
      // Grab all the command files from the commands directory you created earlier
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".cjs") || file.endsWith(".js"));
      commands.push(commandFiles);
    }

    return commands;
  }
}

module.exports = commandLoader;
