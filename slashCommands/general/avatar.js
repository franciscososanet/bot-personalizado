const discord = require("discord.js");

module.exports = { 

    name: "avatar",
    description: "Mostrar el avatar de un usuario",
    options: [
        {
            name: "usuario",
            description: "El avatar de quién mostrar",
            type: "USER",
            required: "true"
        }
    ],
 
    run: async (client, interaction) => {
        
        const user = interaction.options.getUser("usuario");

        const msg = new discord.MessageEmbed()
            .setTitle(`Avatar de ${user.tag}`)
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
            .setColor("RANDOM")
            .setFooter({ text: `Solicitado por: ${interaction.user.tag}` })
            .setTimestamp();

        interaction.reply({ embeds: [msg] });
    }

};