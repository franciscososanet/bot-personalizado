const discord = require("discord.js")
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {

  name: "musica-reanudar",
  description: "Reanudar la reprodución de la música pausada.",

  run: async (client, interaction) => {

    const pvc = getVoiceConnection(interaction.guild.id);
    const vc = interaction.member.voice.channel;

    if(!vc) return interaction.reply({ content: `<@${interaction.user.id}>, tenés que estar conectado en un canal de voz.`, ephemeral: true });
    if(!pvc) return interaction.reply({ content: `<@${interaction.user.id}>, el bot no está reproduciendo música.`, ephemeral: true });
    if(vc != pvc.joinConfig.channelId) return interaction.reply({ content: `<@${interaction.user.id}>, tenés que estar conectado en el mismo canal de voz que el bot`, ephemeral: true });

    const player = pvc.state.subscription.player;

    if(player.state.status == "playing") return interaction.reply({ content: `<@${interaction.user.id}>, el bot no está pausado.`});

    if(player.state.status == "paused"){

      player.unpause();

      const documentacionChannel = client.channels.cache.get("1007025902246436945");

      const msg = new discord.MessageEmbed()
        .setColor("GREYPLE")
        .setTitle("MÚSICA REANUDADA")
        .setDescription(`Para ver todos los comandos de música, revisar la <#${documentacionChannel.id}>`)
        .setFooter({ text: `Reanudado por: ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()

      interaction.reply({ embeds: [msg], ephemeral: false });

    } 

  }

}