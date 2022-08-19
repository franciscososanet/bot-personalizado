const discord = require("discord.js");

module.exports = async (client, discord, interaction)  => {

    const logChannel = client.channels.cache.get("1009958301057945760");
    
    if(interaction.isButton()){

        //#region AUTOROLES

        const rolSinRoles = "1009943784676655105";
        const rolProgramador = "1009882061101867119";
        const rolGaming = "1009909682271424612";

        if(interaction.customId === "rol-programacion"){
            
            if(interaction.member.roles.cache.has(rolProgramador)){
                interaction.member.roles.remove(rolProgramador);
                interaction.reply({ content: `<@${interaction.user.id}>, se te removió el rol <@&${rolProgramador}>`, ephemeral: true });

                if(!interaction.member.roles.cache.has(rolGaming)){
                    interaction.member.roles.add(rolSinRoles);
                }
                
                const msg = new discord.MessageEmbed()
                    .setTitle(`¡Rol removido a ${interaction.user.username}!`)
                    .setColor("RED")
                    .setDescription(`**ROL NAME:** <@&${rolProgramador}>\n**USER TAG:** ${interaction.user.tag}`)
                    .setTimestamp();
        
            logChannel.send({ embeds: [msg] });

            }else{
                interaction.member.roles.add(rolProgramador);
                interaction.reply({ content: `<@${interaction.user.id}>, se te añadió el rol <@&${rolProgramador}>`, ephemeral: true });

                if(interaction.member.roles.cache.has(rolSinRoles)){
                    interaction.member.roles.remove(rolSinRoles)
                }

                const msg = new discord.MessageEmbed()
                .setTitle(`¡Rol añadido a ${interaction.user.username}!`)
                .setColor("GREEN")
                .setDescription(`**ROL NAME:** <@&${rolProgramador}>\n**USER TAG:** ${interaction.user.tag}`)
                .setTimestamp();
        
            logChannel.send({ embeds: [msg] });
            }
        }

        if(interaction.customId === "rol-gaming"){

            if(interaction.member.roles.cache.has(rolGaming)){
                interaction.member.roles.remove(rolGaming);
                interaction.reply({ content: `<@${interaction.user.id}>, se te removió el rol <@&${rolGaming}>`, ephemeral: true });

                if(!interaction.member.roles.cache.has(rolProgramador)){
                    interaction.member.roles.add(rolSinRoles);
                }

                const msg = new discord.MessageEmbed()
                    .setTitle(`¡Rol removido a ${interaction.user.username}!`)
                    .setColor("RED")
                    .setDescription(`**ROL NAME:** <@&${rolGaming}>\n**USER TAG:** ${interaction.user.tag}`)
                    .setTimestamp();
        
                logChannel.send({ embeds: [msg] });

            }else{
                interaction.member.roles.add(rolGaming);
                interaction.reply({ content: `<@${interaction.user.id}>, se te añadió el rol <@&${rolGaming}>`, ephemeral: true });

                if(interaction.member.roles.cache.has(rolSinRoles)){
                    interaction.member.roles.remove(rolSinRoles)
                }

                const msg = new discord.MessageEmbed()
                    .setTitle(`¡Rol añadido a ${interaction.user.username}!`)
                    .setColor("GREEN")
                    .setDescription(`**ROL NAME:** <@&${rolGaming}>\n**USER TAG:** ${interaction.user.tag}`)
                    .setTimestamp();
        
                logChannel.send({ embeds: [msg] });
            }
        }

        //#endregion AUTOROLES
        

        //#region TICKETS

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
        //#endregion CrearTicket

        //#region CerrarTicket

        if(interaction.customId === "ticket-cerrar"){

            channel = interaction.guild.channels.cache.find(c => c.name === `ticketabierto-${interaction.user.username}`);

            if(channel){
                
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

                channel.setName(`ticketcerrado-${interaction.user.username}`);


                //Log
                const msg = new discord.MessageEmbed()
                    .setTitle(`¡Ticket cerrado!`)
                    .setColor("RED")
                    .setDescription(`**CHANNEL NAME**: ${interaction.channel.name}\n**CHANNEL ID**: ${interaction.channel.id}\n\n**CERRADO POR:** ${interaction.user.tag}`)
                    .setTimestamp();
    
                logChannel.send({ embeds: [msg] });
                
            }
        }

        //#endregion CerrarTicket
        //#endregion TICKETS
    }
    
    
    if(interaction.isCommand() || interaction.isContextMenu()){

        const command = client.slash.get(interaction.commandName);

        if(!command) return;
        
        try{
            await command.run(client, interaction);
        }catch(error){
            console.error("ERROR AL EJECUTAR EL COMANDO: " + interaction.commandName + " --- " + error);
        }
    }
    
};