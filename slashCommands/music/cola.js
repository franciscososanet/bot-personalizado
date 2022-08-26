const discord = require("discord.js");
const { fullQueue } = require("../../global/music");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {

  name: "musica-encola",
  description: "Mostrar las canciones en la lista de reproduccion actual.",

  run: async (client, interaction) => {

    const pvc = getVoiceConnection(interaction.guild.id);
    if (!pvc) return interaction.reply("No se esta reproduciendo musica");

    const songs = fullQueue(interaction.guild.id);

    const embed = new discord.MessageEmbed()
      .setColor("WHITE")
      .setTitle("LISTA DE REPRODUCCIÓN")
      .setDescription(`${songs.join("")}\nPodés utilizar **/musica-cancionanterior** o **/musica-cancionsiguiente** para reproducir otra canción de la lista.\n\nPara eliminar una canción, usar **/musica-eliminarcancion** seguido del nombre completo de la canción -tal cual aparece en la lista de reproducción-.`)

    interaction.reply({ embeds: [embed], ephemeral: false });

  }

};