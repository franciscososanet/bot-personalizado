const discord = require("discord.js");
const ms = require("ms");

module.exports = {

    name: "mute",
    description: "Mutear a un usuario.",
    options: [
        {
            name: "usuario",
            description: "El usuario a mutear.",
            type: "USER",
            required: "true",
        },
        {
            name: "tiempo",
            description: "El tiempo a mutear.",
            type: "STRING",
            required: "true",
        },
        {
            name: "razon",
            description: "Motivo del muteo.",
            type: "STRING",
            required: "true",
        },
    ],
                        
    run: async (client, interaction) => {

        const logChannel = client.channels.cache.get("1009958301057945760");
        const rolMod = "1011505548790870096";

        const user = interaction.options.getUser("usuario");
        const tiempo = interaction.options.getString("tiempo");
        const razon = interaction.options.getString("razon");

        if(!interaction.member.roles.cache.has(rolMod)) return interaction.reply(`<@${interaction.user.id}>, no contás con los permisos requeridos para ejecutar este comando.`);

        const member = await interaction.guild.members.fetch(user.id);

        if(member.isCommunicationDisabled()) return interaction.reply({content: `El usuario ${interaction.user.username} ya se encuentra muteado.\nSi lo querés silenciar por más tiempo, primero desmutealo (**/unmute**).`, ephemeral: true});

        const time = ms(tiempo);

        await member.timeout(time, razon);

        const msg = new discord.MessageEmbed()
            .setTitle(`¡${user.tag} ha sido muteado!`)
            .setDescription(`**Tiempo:** ${tiempo}\n**Razón:** ${razon}\n**Muteado por**: ${interaction.user.tag}`)
            .setColor("RED")
            .setTimestamp();

        interaction.reply({ embeds: [msg] });

        logChannel.send({ embeds: [msg] });
    }
};