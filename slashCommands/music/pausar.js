const discord = require("discord.js")
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {

  name: "musica-pausar",
  description: "Pausar reproducción.",

  run: async (client, interaction) => {

    const pvc = getVoiceConnection(interaction.guild.id);
    const vc = interaction.member.voice.channel;

    if(!vc) return interaction.reply({ content: `<@${interaction.user.id}>, tenés que estar conectado en un canal de voz.`, ephemeral: true });
    if(!pvc) return interaction.reply({ content: `<@${interaction.user.id}>, el bot no está reproduciendo música.`, ephemeral: true });
    if(vc != pvc.joinConfig.channelId) return interaction.reply({ content: `<@${interaction.user.id}>, tenés que estar conectado en el mismo canal de voz que el bot.`, ephemeral: true });

    const player = pvc.state.subscription.player;

    if(player.state.status == "paused") return interaction.reply({ content: `<@${interaction.user.id}>, el bot no está reproduciendo música.`});

    if(player.state.status == "playing"){
      
      player.pause();

      const documentacionChannel = client.channels.cache.get("1007025902246436945");

      const msg = new discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle("MÚSICA PAUSADA")
        .setDescription(`Para volver a reproducir, utilizar **/musica-reanudar**\nPara ver todos los comandos de música, revisar la <#${documentacionChannel.id}>`)
        .setFooter({ text: `Pausado por: ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp();

      interaction.reply({ embeds: [msg], ephemeral: false });

    }

  }

}