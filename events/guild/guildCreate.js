module.exports = async (client, discord, guild) => {

    let serverOwner = await guild.fetchOwner();

    serverOwner.send(`¡${serverOwner.user.username}, gracias por invitarme a **${guild.name}**!.\n\nDebo informarte que **estoy exclusivamente programado para https://discord.franciscososa.net**, por lo que muy probable que no funcione correctamente en tu servidor.\n\nSi precisás **tu propio bot**, podés contactar con mi creador vía Discord (*panch1#3894*) o por los otros medios disponibles en **https://franciscososa.net/#contacto**`);

    const logChannel = client.channels.cache.get("1007338362438438922");

    const msg = new discord.MessageEmbed()
        .setTitle(`¡${client.user.username} se unió a un nuevo servidor!`)
        .setColor("GREEN")
        .setDescription(`**SERVER NAME:** ${guild.name} \n**SERVER ID:** ${guild.id} \n\n**DUEÑO TAG:** ${serverOwner.user.tag}\n**DUEÑO ID:** ${serverOwner.user.id}`)
        .setTimestamp();

    logChannel.send({ embeds: [msg] });
    

} 


