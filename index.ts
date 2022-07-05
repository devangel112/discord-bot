import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

client.on('ready', () => {
  new WOKCommands(client, {
    // The name of the local folder for your command files
    commandsDir: path.join(__dirname, 'commands'),
    // The name of the local folder for your features files
    featuresDir: path.join(__dirname, 'features'),
    // Allow importing of .ts files if you are using ts-node
    typeScript: true,
    // What guilds your slash commands will be created in
    testServers: ['324031676558606339']
  })
  .setDefaultPrefix('?')
  .setColor(0xff0000)
})

client.login(process.env.TOKEN)