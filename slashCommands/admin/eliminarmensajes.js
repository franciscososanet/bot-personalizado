const discord = require("discord.js");

module.exports = {

    name: "eliminarmensajes",
    description: "Eliminar una cierta cantidad de mensajes",
    options: [
      {
        name: "cantidad",
        description: "Mensajes a eliminar",
        type: "STRING",
        required: "true"
      },
      {
        name: "razon",
        description: "Motivo por el cual eliminar los mensajes",
        type: "STRING",
        required: "true"
      }
    ],

    run: async(client, message) => {

      const rolMod = "1011505548790870096";

      if(!message.member.roles.cache.has(rolMod)) return message.reply(`<@${message.user.id}>, no contás con los permisos requeridos para ejecutar este comando.`);

      const logChannel = client.channels.cache.get("1009958301057945760");
      const cantidad = message.options.getString("cantidad");
      const razon = message.options.getString("razon");

      if(isNaN(cantidad)) return message.reply({ content: `"${cantidad}" no es un número.`, ephemeral: true });
      if(cantidad < 1) return message.reply({ content: `La cantidad debe ser mayor a 0`, ephemeral: true });

      const msg = new discord.MessageEmbed()
        .setTitle(`¡${cantidad} mensajes eliminados!`)
        .setDescription(`**EN CANAL:** ${message.channel.name}\n**POR:** ${message.user.tag}\n**RAZÓN:** ${razon}`)
        .setColor("RED")
        .setTimestamp();

      await message.channel.messages
        .fetch({limit: cantidad })
        .then((mensajes) => { 
          message.channel.bulkDelete(mensajes); 
          message.reply(`Se eliminaron correctamente los últimos ${cantidad} mensajes de este canal.`)
          logChannel.send({ embeds: [msg] });
        });

    }
    
  }