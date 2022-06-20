module.exports = async (client, discord, guild)  => {

    let serverOwner = await guild.fetchOwner();
    serverOwner.send('Gracias por invitarme a tu servidor.\nhttps://franciscososa.net');
    //mensaje de bienvenida
} 


