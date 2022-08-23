module.exports = {
    
    name: "ping",
    description: "Muestra el ping del bot",

    run: async(client, interaction) => {

        interaction.reply({ content: `Actualmente cuento con **${client.ws.ping} ms**` });
    }
    
}