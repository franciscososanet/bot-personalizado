const { getVoiceConnection } = require("@discordjs/voice");
const { nextSong } = require("../../global/music");

module.exports = {

  name: "musica-cancionsiguiente",
  description: "Saltear a la siguiente canción.",

  run: async (client, interaction) => {

    const mvc = interaction.member.voice.channel.id;
    const pvc = getVoiceConnection(interaction.guild.id);

    if(!pvc) return interaction.reply({ content: `<@${interaction.user.id}>, el bot no está reproduciendo música.`, ephemeral: true });
    if (mvc != pvc.joinConfig.channelId)  return interaction.reply({ content: `<@${interaction.user.id}, tenés que estar conectado en el mismo canal de voz que el bot.`, ephemeral: true });

    const player = getVoiceConnection(interaction.guild.id).state.subscription.player;

    nextSong(interaction.guild.id, player.state.resource.metadata.key, interaction, player, pvc, "cmd");
  
  }

}