const discord = require("discord.js");

module.exports = async (client, discord, interaction)  => {

    const logChannel = client.channels.cache.get("1007390629648683018");

    //#region TICKETS
    if(interaction.isButton()){

        //#region CrearTicket
        if(interaction.customId === "ticket-crear"){

            const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone");

            if(interaction.guild.channels.cache.find(c => c.name === `ticketabierto-${interaction.user.username}`)){
                
                interaction.reply({ content: `<@${interaction.user.id}>, ya hay un ticket abierto a tu nombre y solo se puede tener uno activo por usuario. \nSi deseás crear uno nuevo, por favor marcá como cerrado tu ticket actualmente abierto.`, ephemeral: true });
            }else{

                interaction.guild.channels.create(`ticketabierto-${interaction.user.username}`, {
    
                    type: "GUILD_TEXT",
                    parent: "964272478958530611",
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
                        .setTitle(`${interaction.user.username}, ¡este es tu ticket!`)
                        .setDescription("Detalla a continuación tu inconveniente/queja/duda y espera por la respuesta de un moderador/administrador.\n\nCuando des por terminado tu caso, podés cerrar el ticket manualmente con el botón que se encuentra debajo de este texto.")

                    const row = new discord.MessageActionRow()
                    .addComponents(
                        new discord.MessageButton()
                            .setCustomId("ticket-cerrar")
                            .setLabel("| Cerrar ticket")
                            .setStyle("DANGER")
                            .setEmoji("❎")
                    )

                    c.send({ embeds: [mensaje], components: [row] });
                
                });    
    
                interaction.reply({ content: `<@${interaction.user.id}>, tu ticket ha sido creado correctamente. \n**El canal contiene tu nombre y está situado en la parte superior del servidor.**`, ephemeral: true });
    
                //Log
                const msg = new discord.MessageEmbed()
                    .setTitle(`¡Ticket creado!`)
                    .setColor("GREEN")
                    .setDescription(`**USER NAME:** ${interaction.user.username}\n**USER TAG:** ${interaction.user.tag}\n**USER ID:** ${interaction.user.id}`)
                    .setTimestamp();
    
                logChannel.send({ embeds: [msg] });
            }      
        } 
        //#endregion

        //#region CerrarTicket
        if(interaction.customId === "ticket-cerrar"){

            channel = interaction.guild.channels.cache.find(c => c.name === `ticketabierto-${interaction.user.username}`);

            if(channel){
                channel.setName(`ticketcerrado-${interaction.user.username}`);

                const embed = new discord.MessageEmbed()
                    .setTitle(`¡Ticket cerrado por ${interaction.user.tag}!`)
                    .setColor("BLURPLE")
                    .setTimestamp();

                    
                interaction.reply({embeds: [embed], ephemeral: false });

                //El creador del ticket ya no visualizará el ticket
                const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone");

                channel.permissionOverwrites.set([
                    {
                        id: everyone.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }
                ])


                //Log
                const msg = new discord.MessageEmbed()
                    .setTitle(`¡Ticket cerrado!`)
                    .setColor("RED")
                    .setDescription(`**CHANNEL NAME**: ${interaction.channel.name}\n**CHANNEL ID**: ${interaction.channel.id}\n\n**CERRADO POR:** ${interaction.user.tag}`)
                    .setTimestamp();
    
                logChannel.send({ embeds: [msg] });
                
            }
        }

        //#endregion
    }
    //#endregion
    
    
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
    //#endregion
    
};