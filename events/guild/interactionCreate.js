const discord = require("discord.js");

module.exports = async (client, discord, interaction)  => {

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