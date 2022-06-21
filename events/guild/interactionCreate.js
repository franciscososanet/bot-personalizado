const discord = require("discord.js");

module.exports = async (client, discord, interaction)  => {

    //CREAR TICKET
    if(interaction.isButton()){
        if(interaction.customId === "tickets"){
            const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone");
            interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                type: "GUILD_TEXT",
                parent: "988508142381965373",
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    },
                    {
                        id: everyone.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }
                ]
            }).then(c => {
                const mensaje = new discord.MessageEmbed()
                    .setTitle(`${interaction.user.username}, este es tu ticket`)
                    .setDescription("Escribe tu duda/pregunta/queja.\nSé paciente y espera por un moderador.")
                    .setColor("RANDOM");

                c.send({ embeds: [mensaje] });
            });    

            interaction.reply({ content: `<@${interaction.user.id}>, tu ticket ha sido creado.`, ephemeral: true });
        }
    }

    //ejecucion de comandos y context menu
    if(interaction.isCommand() || interaction.isContextMenu()){
        const command = client.slash.get(interaction.commandName);

        if(!command) return;
        
        try{
            await command.run(client, interaction);
        }catch(e){
            console.error("ERROR AL EJECUTAR EL COMANDO: " + interaction.commandName + " --- " + e);
        }
    }
    
};