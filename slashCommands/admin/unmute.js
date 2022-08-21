const discord = require("discord.js");

module.exports = {

    name: "unmute",
    description: "Desmutear a un usuario",
    options: [
        {
            name: "usuario",
            description: "Usuario a desmutear",
            type: "USER",
            required: true,
        }
    ],

    run: async(client, interaction) => {

        const logChannel = client.channels.cache.get("1009958301057945760");

        const user = interaction.options.getUser("usuario");

        if(!interaction.member.permissions.has("MODERATE_MEMBERS")) return interaction.reply(`<@${interaction.user.id}>, no contás con los permisos requeridos para ejecutar este comando.`);

        const member = await interaction.guild.members.fetch(user.id);

        if(!member.isCommunicationDisabled()) return interaction.reply({content: `El usuario ${interaction.user.username} no se encuentra muteado.`, ephemeral: true });

        await member.timeout(null);

        const msg = new discord.MessageEmbed()
            .setTitle(`¡${user.tag} ha sido desmuteado!`)
            .setDescription(`**Desmuteado por:** ${interaction.user.tag}`)
            .setColor("GREEN")
            .setTimestamp();

        interaction.reply({ embeds: [msg] });

        logChannel.send({ embeds: [msg] });

    }
};