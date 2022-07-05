import { GuildMember, Intents, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "Testing",
  description: "Ban an user", // Required for slash commands

  slash: "both", // Create both a slash and legacy command
  testOnly: true, // Only register a slash command for the testing guilds

  guildOnly: true,

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
    if (!target.bannable) {
      return {
        custom: true,
        content: "No puedes banear a este usuario.",
        emphemeral: true,
      };
    }

    args.shift();
    const reason = args.join(" ");
    target.ban({
      reason,
      days: 7,
    });

    const embedResponse = new MessageEmbed()
      .setTitle(
        `${interaction.user.username} ha baneado a ${target.displayName}`
      )
      .addFields({
        name: "Razón",
        value: `${reason}`,
      })
      .setColor("RANDOM");

    return embedResponse;
  },
} as ICommand;
