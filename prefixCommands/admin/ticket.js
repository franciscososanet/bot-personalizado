const Discord = require("discord.js");

module.exports = {
    
    name: "ticket",
    alias: [],

    execute(client, message, args){
        const embed = new Discord.MessageEmbed()
            .setTitle("Creación de Ticket")
            .setDescription("En caso de tener algún inconveniente, queja o duda, podés comunicarte con algún moderador o administrador creando un ticket clickeando en el botón de abajo. Esto creará un nuevo canal de texto privado como vía de comunicación.")
            .setColor("GREEN");

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("ticket-crear")
                    .setStyle("SUCCESS")
                    .setLabel("Crear ticket")
                    .setEmoji("✉")
            );

        message.channel.send({ embeds: [embed], components: [row] });
    }
    
}