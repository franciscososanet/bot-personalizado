module.exports = async (client, discord, guild) => {

    let serverOwner = await guild.fetchOwner();

    serverOwner.send(`${serverOwner.user.username}, ¡fui expulsado de **${guild.name}**!.\n\nProbablemente haya sido porque **estoy exclusivamente programado para funcionar correctamente en https://discord.franciscososa.net**.\n\nSi precisás **tu propio bot**, podés contactar con mi creador por Discord (*panch1#3894*) o por los otros medios disponibles en **https://franciscososa.net/#contacto**`);

    const logChannel = client.channels.cache.get("1007338362438438922");

    const msg = new discord.MessageEmbed()
        .setTitle(`¡${client.user.username} abandonó un servidor!`)
        .setColor("RED")
        .setDescription(`**SERVER NAME:** ${guild.name} \n**SERVER ID:** ${guild.id} \n\n**DUEÑO TAG:** ${serverOwner.user.tag}\n**DUEÑO ID:** ${serverOwner.user.id}`)
        .setTimestamp();

    logChannel.send({ embeds: [msg] });
} 


