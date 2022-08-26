const discord = require("discord.js");
const play = require("play-dl");
const { v4: uuidv4 } = require("uuid");
const { queue, agregar, musicEmbed, queueEmbed, nextSong } = require("../../global/music");
const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus, getVoiceConnection } = require("@discordjs/voice");

module.exports = {

  name: "musica-play",
  description: "Reproducir una canción.",
  options: [
    {
      name: "cancion",
      description: "Nombre o link de la canción a reproducir",
      type: "STRING",
      required: "true",
    }
  ],

  run: async (client, interaction) => {
    
    const vc = interaction.member.voice.channel;
    if (!vc) return interaction.reply({ content: `<@${interaction.user.id}>, tenés que estar conectado en un canal de voz`, ephemeral: true });

    const documentacionChannel = client.channels.cache.get("1007025902246436945");
    
    //Búsqueda de canción
    const ytInfo = await play.search(interaction.options.getString("cancion"));
    const stream = await play.stream(ytInfo[0].url);

    //Agregar canción a lista de reproducción
    const song = { key: uuidv4(), title: ytInfo[0].title, url: ytInfo[0].url };
    agregar(interaction.guild.id, song);

    //Comprobar si se está reproduciendo música
    const pvc = getVoiceConnection(interaction.guild.id);
    if (pvc) return interaction.reply({ embeds: [queueEmbed(ytInfo[0].title, ytInfo[0].url, ytInfo[0].thumbnails[1].url, interaction.user )] }); 

    //Conexión
    const connection = joinVoiceChannel({
      channelId: vc.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
      metadata: {
        title: ytInfo[0].title,
        key: song.key,
      }
    });

    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);

    interaction.reply({ embeds: [musicEmbed(ytInfo[0].title, ytInfo[0].durationRaw, ytInfo[0].uploadedAt, ytInfo[0].views, ytInfo[0].url, ytInfo[0].thumbnails[1].url, interaction.user)] });

    //Desconectar bot al terminar la reproducción
    player.on(AudioPlayerStatus.Idle, async (oldS, newS) => {

      const msg = new discord.MessageEmbed()
      .setColor("DARK_GOLD")
      .setTitle(`MÚSICA FINALIZADA`)
      .setDescription(`Bot desconectado al no tener más canciones por reproducir.\nPara ver todos los comandos de música, revisar la <#${documentacionChannel.id}>`)
      .setTimestamp();

      if(queue.get(interaction.guild.id).songs.length <= 1 && queue.get(interaction.guild.id).loop == false) {
        connection.destroy();
        queue.delete(interaction.guildId);
        return interaction.channel.send({ embeds: [msg], ephemeral: false });
      }else{
        return nextSong(interaction.guild.id, oldS.resource.metadata.key, interaction, player, connection, "auto");
      }
    });
    
  }

}