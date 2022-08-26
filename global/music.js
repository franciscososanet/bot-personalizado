const discord = require("discord.js")
const play = require("play-dl");
const { createAudioResource } = require("@discordjs/voice");
const queue = new Map();


//#region CREAR REPRODUCTOR
const reproducir = async (player, msg, url, key) => {
  
  if (msg.type == "APPLICATION_COMMAND" && msg.replied == false) {
    msg.deferReply();
  }

  const ytInfo = await play.search(url);
  const stream = await play.stream(ytInfo[0].url);

  const emb = musicEmbed(
    ytInfo[0].title,
    ytInfo[0].durationRaw,
    ytInfo[0].uploadedAt,
    ytInfo[0].views,
    ytInfo[0].url,
    ytInfo[0].thumbnails[1].url,
    msg.user
  );

  if(msg.type == "APPLICATION_COMMAND"){
    msg.followUp({ embeds: [emb] });
  }else{
    msg.reply({ embeds: [emb] });
  }

  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
    metadata: {
      title: ytInfo[0].title,
      key: key,
    }
  });

  player.play(resource);

};

//#endregion CREAR REPRODUCTOR


//#region AGREGAR CANCIONES A LISTA DE REPRODUCCION
const agregar = (guildId, song) => {

  const srv_queue = queue.get(guildId);

  if(!srv_queue){
    const queue_const = { loop: false, songs: [] };
    queue.set(guildId, queue_const);
    queue_const.songs.push(song);
  }else{
    srv_queue.songs.push(song);
  }
};

//#endregion AGREGAR CANCIONES A LISTA DE REPRODUCCION


//#region LISTA DE REPRODUCCIÓN
const fullQueue = (guildId) => {

  const srv_queue = queue.get(guildId);

  if(!srv_queue) return "Sin canciones";

  const songs = [];

  srv_queue.songs.forEach((song) => {
    songs.push(`[${song.title}](${song.url})\n`);
  });

  return songs;
};

//#endregion LISTA DE REPRODUCCIÓN


//#region ELIMINAR CANCIONES
const eliminar = (title, guildId) => {

  const srv_queue = queue.get(guildId);
  
  if (!srv_queue) return "Sin canciones";

  const songTitle = (song) => song.title.includes(title);
  const songIndex = srv_queue.songs.findIndex(songTitle);
  const songFullTitle = srv_queue.songs.find(songTitle);

  if(!songIndex || songIndex == -1){

    const msg = new discord.MessageEmbed()
      .setColor("RED")
      .setTitle("ERROR AL REMOVER CANCIÓN")
      .setDescription(`No se encontró la canción: **${title}**.\n\nAsegurate de estar escribiendo el nombre completo tal cual aparece en la lista de reproducción: (**/musica-encola**)`)
      
    return msg;

  }
    
  srv_queue.songs.splice(songIndex, 1);

  const msg = new discord.MessageEmbed()
      .setColor("GREY")
      .setTitle("CANCIÓN REMOVIDA")
      .setDescription(`Se eliminó **${title}** de la lista de reproducción.`);

  return msg;

};

//#endregion ELIMINAR CANCIONES


//#region EMBEDS
  //REPRODUCIENDO AHORA
const musicEmbed = (title, duracion, subida, vistas, link, image, user) => {

  let msg = new discord.MessageEmbed()
    .setColor("AQUA")
    .setAuthor({ name: `REPRODUCIENDO AHORA:` })
    .setTitle(`${title}`)
    .setDescription(`Duración: ${duracion}\nSubido hace: ${subida}\nVistas: ${vistas}`)
    .setURL(`${link}`)
    .setImage(`${image}`)
    .setFooter({ text: `Solicitado por: ${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` }) 
    .setTimestamp();
  
  return msg;
}

  //AGREGAR CANCION A LISTA DE REPRODUCCIONAgregar canción a la cola
const queueEmbed = (title, link, image, user) => {

  let msg = new discord.MessageEmbed()
    .setColor("BLUE")
    .setAuthor({ name: `AGREGADO A LA COLA: `})
    .setTitle(`${title}`)
    .setURL(`${link}`)
    .setImage(`${image}`)
    .setFooter({ text: `Canción agregada por: ${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true} )}`})
    .setTimestamp();

  return msg;
}
//#endregion EMBEDS


//#region SIGUIENTE CANCIÓN
const nextSong = async (guildId, key, msg, player, connection, type) => {

  const queue_songs = queue.get(guildId);
  const songKey = (song) => song.key == key;
  const nextIndex = queue_songs.songs.findIndex(songKey) + 1;

    const embed = new discord.MessageEmbed()
      .setColor("DARK_GOLD")
      .setTitle(`MÚSICA FINALIZADA`)
      .setDescription(`Bot desconectado al no tener más canciones por reproducir.`)
      .setTimestamp();
    
  if(!queue_songs.songs[nextIndex]){

    if(type === "auto" && queue_songs.loop){

      reproducir(player, msg, queue_songs.songs[0].url, queue_songs.songs[0].key);

      if(msg.type == "APPLICATION_COMMAND") return msg.followUp("Reiniciando las canciones")
      else return msg.channel.send("Reiniciando las canciones");  

    }else if(type === "auto"){

      connection.destroy();
      queue.delete(guildId);
      return msg.channel.send({ embeds: [embed] });
    }

    return msg.channel.send({ embeds: [embed] });

  }

  reproducir(player, msg, queue_songs.songs[nextIndex].url, queue_songs.songs[nextIndex].key);
}
//#endregion SIGUIENTE CANCIÓN


//#region ANTERIOR CANCIÓN
const previousSong = async (guildId, key, msg, player, connection) => {

  const queue_songs = queue.get(guildId);
  const songKey = (song) => song.key == key;
  const previousIndex = queue_songs.songs.findIndex(songKey) - 1;

  if(!queue_songs.songs[previousIndex]) return msg.reply({ content: `No existen canciones previas a esta.`, ephemeral: true });

  reproducir(player, msg, queue_songs.songs[previousIndex].url, queue_songs.songs[previousIndex].key);
}

//#endregion ANTERIOR CANCIÓN


module.exports = {

  queue,
  agregar,
  eliminar,
  fullQueue,
  musicEmbed,
  queueEmbed,
  nextSong,
  previousSong

}