const discord = require("discord.js");

module.exports = {
    
    name: "ticket",
    alias: [],

    execute(client, message, args){

        const logChannel = client.channels.cache.get("1009958301057945760");

        if(message.author.id === "271464492204818442"){

            const embed = new discord.MessageEmbed()
            .setTitle("Creación de Ticket")
            .setDescription("En caso de tener algún inconveniente, queja o duda, podés comunicarte con algún moderador o administrador creando un ticket clickeando en el botón de abajo. Esto creará un nuevo canal de texto privado como vía de comunicación.")
            .setColor("GREEN");

        const row = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("ticket-crear")
                    .setStyle("SUCCESS")
                    .setLabel("Crear ticket")
                    .setEmoji("✉")
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