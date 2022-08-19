const discord = require("discord.js");

module.exports = {
    
    name: "autorol",
    alias: [],

    execute(client, message, args){

    const logChannel = client.channels.cache.get("1009958301057945760");

        if(message.author.id === "271464492204818442"){

            const embed = new discord.MessageEmbed()
                .setTitle("¡Elegí tus roles!")
                .setDescription("Son necesarios para que puedas visualizar los canales que quieras.\nApretá el botón correspondiente y se te asignará el rol automáticamente.")
                .setColor("BLURPLE");

            const row = new discord.MessageActionRow()
                .addComponents(
                    new discord.MessageButton()
                        .setCustomId("rol-programacion")
                        .setStyle("PRIMARY")
                        .setLabel("| Programación")
                        .setEmoji("💻"),
                    new discord.MessageButton()
                        .setCustomId("rol-gaming")
                        .setStyle("SUCCESS")
                        .setLabel("| Gaming")
                        .setEmoji("🎮")
            );

            message.channel.send({ embeds: [embed], components: [row] });

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