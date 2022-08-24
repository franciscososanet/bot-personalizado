const colors = require('colors');
const discord = require("discord.js");

module.exports = async (client) => {

    client.user.setUsername("FRANCISCOSOSA.net");
    client.user.setActivity("www.franciscososa.net", { type: 'WATCHING' });
    client.user.setStatus("online");

    console.log(colors.bgGreen(`- BOT ${client.user.username} (${client.user.id}) ESTÁ EN LINEA\n`));

    //#region YOUTUBE NOTIFICACION
    const { getChannelVideos } = require("yt-channel-info");
    const db = require("megadb");
    const yt = new db.crearDB("yt");

    setInterval(async function(){

        const canalYt = "UCQvM5bl-CMhpWkrslaeUHPA"; //botas
        const videos = await getChannelVideos(`${canalYt}`, 0);
        const ultimoVideo = videos.items[0];
        const titulo = await yt.obtener(`${canalYt}`);

        if(titulo === ultimoVideo.title) return;
        if(titulo !== ultimoVideo.title){

            yt.establecer(`${canalYt}`, ultimoVideo.title);            
            client.channels.cache.get("1010352074732617839").send({content: `¡${ultimoVideo.author} subió un nuevo video!\n**${ultimoVideo.title}**\nhttps://www.youtube.com/watch?v=${ultimoVideo.videoId}`});
        } 
        
    }, 60000);
    //#endregion YOUTUBE NOTIFICACION

}