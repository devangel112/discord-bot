import { GuildMember, Intents } from 'discord.js'
import { ICommand } from 'wokcommands'
 

export default {
  category: 'Testing',
  description: 'Kick a user', // Required for slash commands
  
  slash: 'both', // Create both a slash and legacy command
  testOnly: true, // Only register a slash command for the testing guilds

  //Permissions: 'ADMINISTRATOR',
  //requireRoles:true,

  minArgs:2,
  expectedArgs: '<user> <reason>',
  expectedArgsTypes : ['USER', 'STRING'],
  
  callback: ({ message, interaction,args }) => {
    const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember 
    if (!target){
      return 'Por favor menciona a un usuario valido.'
    }
    if (!target.kickable){
      return{
      custom:true,
      content: 'No puedes kickear a este usuario.',
      emphemeral:true
    }
    }

    args.shift()
    const reason=args.join(' ')
    target.kick(reason)

    return {
      custom:true,
      contet:'Has kickeado a <@${target.id}>',
      emphemeral:true
    }

    
  },
} as ICommand