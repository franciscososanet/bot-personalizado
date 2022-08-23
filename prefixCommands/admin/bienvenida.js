const discord = require("discord.js");

module.exports = {
    
    name: "bienvenida",
    alias: [],

    execute(client, message, args){

        const logChannel = client.channels.cache.get("1009958301057945760");
        const rolesChannel = client.channels.cache.get("1007082047308832828");
        const documentacionChannel = client.channels.cache.get("1007025902246436945");
        const soporteChannel = client.channels.cache.get("1007395316221345812");

        if(message.author.id === "271464492204818442"){

            const redes = new discord.MessageActionRow()
                .addComponents(
                    new discord.MessageButton()
                        .setStyle("LINK")
                        .setURL("http://franciscososa.net")
                        .setLabel("Página web"),
                    new discord.MessageButton()
                        .setStyle("LINK")
                        .setURL("https://instagram.com/franciscososanet")
                        .setLabel("Instagram"),
                    new discord.MessageButton()
                        .setStyle("LINK")
                        .setURL("https://twitter.com/franmanuelvd")
                        .setLabel("Twitter"),
                    new discord.MessageButton()
                        .setStyle("LINK")
                        .setURL("https://youtube.com/channel/UCg58zImK4lmycp_n0HPsk8g")
                        .setLabel("Youtube"),
                    new discord.MessageButton()
                        .setStyle("LINK")
                        .setURL("https://github.com/franciscososanet")
                        .setLabel("GitHub")
                )

            message.channel.send({content: `**¡BIENVENIDO a FRANCISCOSOSA.net!**\n\n**->** Este servidor está destinado a pasarla bien entre amigos vía videojuegos y programación.\n\n**->** Para visualizar los canales, escogé tus <#${rolesChannel.id}>.\n\n**->** La moderación está a cargo de este mismo bot. Si querés saber más de mis funciones podér revisar mi <#${documentacionChannel.id}>.\n\n**->** Podés invitar a tus amigos a este servidor desde el siguiente link: https://discord.franciscososa.net .\n\n**->** Si presentás algún inconveniente o duda, podés crear un ticket de <#${soporteChannel.id}>.\n\n**->** En caso de querer saber más de mi y de los servicios que ofrezco, podés visitar mi web y seguirme en las siguientes redes sociales:`, components: [redes]})

        }else{
            
            message.reply(`<@${message.author.id}>, no contás con los permisos requeridos para ejecutar este comando.`);

            const msg = new discord.MessageEmbed()
                .setTitle(`¡${message.author.tag} intentó usar un comando sin permisos!`)
                .setColor("RED")
                .setDescription(`\n**USER NAME:** ${message.author.username}\n**USER ID:** ${message.author.id}\n\n **COMANDO:** ${message.content}\n**EN CANAL:** ${message.channel}`)
                .setTimestamp();

            logChannel.send({ embeds: [msg] });
        }
    }

}