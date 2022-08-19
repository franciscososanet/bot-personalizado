module.exports = async (client, discord, member) => {

    if(member.guild.id === "271465017029689344"){

        const logChannel = client.channels.cache.get("1009958301057945760");
        
        const rolSinRoles = "1009943784676655105";

        member.roles.add(rolSinRoles);

        const msg = new discord.MessageEmbed()
            .setTitle(`¡${member.user.username} se unió al servidor!`)
            .setColor("GREEN")
            .setDescription(`**TAG**: ${member.user.tag} \n **ID**: ${member.user.id} \n **BOT**: ${member.user.bot}`)
            .setTimestamp();

        logChannel.send({ embeds: [msg] });
    }

} 


