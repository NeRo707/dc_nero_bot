import "dotenv/config";
import { Client, Events, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import algo from "./sus/algo.js";

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  console.log(`Command ${interaction.commandName} was used`);

  if (interaction.commandName === "maita-dfs") {
    interaction.reply(String("```" + algo.dfs + "```"));
  }

  if (interaction.commandName === "maita-bfs") {
    interaction.reply(String("```" + algo.bfs + "```"));
  }

  if (interaction.commandName === "calc") {
    const str = interaction.options.getString("expression");
    const alphabeticRegex = /^[\d+\-*/%()\s]+$/;
    if (alphabeticRegex.test(str) && str.length >= 3 && str[0] >= '0' && str[0] <= '9') {
      interaction.reply('```' + String(eval(str) + '```'));
    } else {
      interaction.reply('```Invalid expression```');
    }
  }
});

client.on("messageCreate", (msg) => {
  const alphabeticRegex = /^[\d+\-*/%()\s]+$/;
  if (!msg.author.bot && alphabeticRegex.test(msg.content) && msg.content.length >= 3 && msg.content[0] >= '0' && msg.content[0] <= '9') {
    msg.reply('```' + String(eval(msg.content) + '```'));
  }
});


const rest = new REST({ version: "10" }).setToken(TOKEN);

async function main() {
  const commands = [
    {
      name: "maita-dfs",
      description: "maitas dfs",
    },
    {
      name: "maita-bfs",
      description: "maitas bfs",
    },
    {
      name: "calc",
      description: "calculator",
      options: [
        {
          name: "expression",
          description: "expression",
          type: 3,
          required: true,
        }
      ]
    }
  ];

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch (err) {
    console.error(err);
  }
}

main();

client.login(TOKEN);
