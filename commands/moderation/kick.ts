import { GuildMember, Intents, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "Testing",
  description: "Kick a user", // Required for slash commands

  slash: "both", // Create both a slash and legacy command
  testOnly: true, // Only register a slash command for the testing guilds

  permissions: ["ADMINISTRATOR"],

  minArgs: 2,
  expectedArgs: "<user> <reason>",
  expectedArgsTypes: ["USER", "STRING"],

  callback: ({ message, interaction, args }) => {
    const target = message
      ? message.mentions.members?.first()
      : (interaction.options.getMember("user") as GuildMember);

    if (!target) {
      return "Por favor menciona a un usuario valido.";
    }
    if (!target.kickable) {
      return {
        custom: true,
        content: "No puedes kickear a este usuario.",
        emphemeral: true,
      };
    }

    args.shift();
    const reason = args.join(" ");
    target.kick(reason);

    const embedResponse = new MessageEmbed()
      .setTitle(`${interaction.user.username} ha kickeado a ${target.displayName}`)
      .addFields({
        name: "Razón",
        value: `${reason}`,
      })
      .setColor("RANDOM");

    return embedResponse;
  },
} as ICommand;
