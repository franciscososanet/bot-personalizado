const discord = require("discord.js");
const { eliminar } = require("../../global/music");

module.exports = {
  name: "musica-eliminarcancion",
  
  description: "Eliminar una cancion de la lista de reproducción.",
  options: [
    {
      name: `cancion`,
      description: `Título completo de la canción`,
      type: "STRING",
      required: "true",
    }
  ],

  run: async (client, interaction) => {

    interaction.reply({ embeds: [eliminar(interaction.options.getString("cancion"), interaction.guild.id)] });

  }

}