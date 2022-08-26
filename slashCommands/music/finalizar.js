const discord = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
const { queue } = require("../../global/music");

module.exports = {

  name: "musica-finalizar",
  description: "Desconectar la música y vaciar la lista de reproducción.",

  run: async (client, interaction) => {

    const pvc = getVoiceConnection(interaction.guild.id);
    const vc = interaction.member.voice.channel;

    if(!vc) return interaction.reply({ content: `<@${interaction.user.id}>, tenés que estar conectado en un canal de voz.`, ephemeral: true });
    if(!pvc) return interaction.reply({ content: `<@${interaction.user.id}>, el bot no está reproduciendo música.`, ephemeral: true });
    if(vc != pvc.joinConfig.channelId) return interaction.reply({ content: `<@${interaction.user.id}>, tenés que estar conectado en el mismo canal de voz que el bot`, ephemeral: true });

    const player = pvc.state.subscription.player;

    queue.delete(interaction.guild.id);

    player.stop();
    pvc.destroy();

    const msg = new discord.MessageEmbed()
      .setColor("LUMINOUS_VIVID_PINK")
      .setTitle("MÚSICA FINALIZADA")
      .setDescription("Bot desconectado y vaciada la lista de reproducción.")
      .setFooter({ text: `Música finalizada por: ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
      .setTimestamp();


    interaction.reply({ embeds: [msg] });

  }

};