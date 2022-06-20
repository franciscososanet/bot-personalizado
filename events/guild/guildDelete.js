module.exports = async (client, discord, guild)  => {

    let serverOwner = await guild.fetchOwner();
    serverOwner.send('He sido expulsado de tu servidor.\nhttps://franciscososa.net');
    //mensaje de despedida
} 


