module.exports = async (client, discord, member) => {

    if(member.guild.id === "271465017029689344"){

        const logChannel = client.channels.cache.get("1007335278182154431");

        const msg = new discord.MessageEmbed()
            .setTitle(`¡${member.user.username} abandonó el servidor!`)
            .setColor("RED")
            .setDescription(`**TAG**: ${member.user.tag} \n **ID**: ${member.user.id} \n **BOT**: ${member.user.bot}`)
            .setTimestamp();

        logChannel.send({ embeds: [msg] });
    } 

}