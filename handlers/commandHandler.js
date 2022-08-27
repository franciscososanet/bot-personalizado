const fs = require("fs");
const colors = require("colors");

module.exports = (client, discord) => {

  console.log(colors.bgCyan("===> PREFIXCOMMANDS -----------"));
  fs.readdirSync("./prefixCommands/").forEach((dir) => {
    const commands = fs.readdirSync(`./prefixCommands/${dir}`).filter((file) => file.endsWith(".js"));

    for (const file of commands) {
      const cmd = require(`../prefixCommands/${dir}/${file}`);
      if (cmd.name) {
        console.log(`PREFIXCOMMAND CARGADO: ${cmd.name}`);
        client.commands.set(cmd.name, cmd);
      } else {
        console.log(`Error en la carga del prefixcommand: ${file}`);
      }
    }
  });

}