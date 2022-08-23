const discord = require("discord.js");

module.exports = {

    name: "ban",
    description: "Banear a un usuario del servidor",
    options: [
        {
            name: "usuario",
            description: "El usuario a expulsar.",
            type: "USER",
            required: "true",
        },
        {
            name: "razon",
            description: "Motivo de la expulsión.",
            type: "STRING",
            required: "true",
        }
    ],
                        
    run: async (client, interaction) => {

        const logChannel = client.channels.cache.get("1009958301057945760");
        const rolMod = "1011505548790870096";

        const user = interaction.options.getUser("usuario");
        const razon = interaction.options.getString("razon");

        if(!interaction.member.roles.cache.has(rolMod)) return interaction.reply(`<@${interaction.user.id}>, no contás con los permisos requeridos para ejecutar este comando.`);
        
        const member = await interaction.guild.members.fetch(user.id);

        if(interaction.member == user) return interaction.reply({content: `No podés banearte a vos mismo.`, ephemeral: true });

        try {
            member.ban({ reason: `${razon} | Baneado por: ${interaction.user.tag}`});    
        } catch (error) {
            console.log(error);
        }
        
        const msg = new discord.MessageEmbed()
            .setTitle(`¡${user.tag} ha sido baneado!`)
            .setDescription(`**Razón:** ${razon}\n**Baneado por**: ${interaction.user.tag}`)
            .setColor("RED")
            .setTimestamp();

        interaction.reply({ embeds: [msg] });

        logChannel.send({ embeds: [msg] });
    }
};