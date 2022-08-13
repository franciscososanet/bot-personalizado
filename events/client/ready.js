const colors = require('colors');

module.exports = async (client) => {

    client.user.setUsername("FRANCISCOSOSA.net");
    client.user.setActivity("www.franciscososa.net", { type: 'WATCHING' });
    client.user.setStatus("online");

    console.log(colors.bgGreen(`- BOT ${client.user.username} (${client.user.id}) ESTÁ EN LINEA\n`));

}