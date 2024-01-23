import "dotenv/config";
import { Client, Events, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { interactionCreateHandler } from "./modules/eventHandlers/interactionCreateHandler.js";
import cmnds from "./o_cmd/cmnds.js";
import { topnCmd_chat } from "./modules/commands/topn_cmds.js";
// import http from "http";
import keepAlive from "../server.js";

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
  // http
  //   .createServer((req, res) => res.end("Bot is alive!"))
  //   .listen(3000 || 5000 || 1000);
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("interactionCreate", interactionCreateHandler);

client.on("ready", () => {
  //14400000
  //10800000
  const channel = client.channels.cache.find(
    (channel) => channel.id === "1198717350820712478",
  );
  setInterval(() => {
    topnCmd_chat(channel);
  }, 10800000);
});

//client.on("messageCreate", messageCreateHandler);

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async function cmds() {
  const commands = cmnds;

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch (err) {
    console.error(err);
  }
})();

client.login(TOKEN);
keepAlive();
