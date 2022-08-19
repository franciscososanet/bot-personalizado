const Discord = require("discord.js");

module.exports = {
    
    name: "autorol",
    alias: [],

    execute(client, message, args){

        if(message.author.id === "271464492204818442"){
            console.log("Lo ejecuto panchi");
        }else{
            console.log("No tenes permisos");
        }

        const embed = new Discord.MessageEmbed()
            .setTitle("¡Elegí tus roles!")
            .setDescription("Son necesarios para que puedas visualizar los canales que quieras.\nApretá el botón correspondiente y se te asignará el rol automáticamente.")
            .setColor("BLURPLE");

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("rol-programacion")
                    .setStyle("PRIMARY")
                    .setLabel("| Programación")
                    .setEmoji("💻"),
                new Discord.MessageButton()
                    .setCustomId("rol-gaming")
                    .setStyle("SUCCESS")
                    .setLabel("| Gaming")
                    .setEmoji("🎮")
            );

        message.channel.send({ embeds: [embed], components: [row] });
    }
    
}