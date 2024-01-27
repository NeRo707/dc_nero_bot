import "dotenv/config";
import moment from "moment";
import { REST } from "@discordjs/rest";
import { Client, Events, GatewayIntentBits, Routes } from "discord.js";
import { topnCmd_chat } from "./modules/commands/topn_cmds.js";
import cmnds from "./o_cmd/cmnds.js";
import { scheduleJob } from "node-schedule";
import { server } from "../server.js";
import { interactionCreateHandler } from "./modules/eventHandlers/interactionCreateHandler.js";

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
    (channel) => channel.id === "1198717350820712478"
  );

  function scheduleFunction() {
    const now = moment().tz("Asia/Tbilisi");
    console.log(now.format("HH:mm"));
    const targetTimes = ["12:00", "18:00", "21:00"];
    const targetTime = ["23:58"];

    if (
      targetTimes.includes(now.format("HH:mm")) ||
      targetTime.includes(now.format("HH:mm"))
    ) {
      console.log("autoTriggered");
      topnCmd_chat(channel);
    }
  }

  scheduleJob("0 58 23 * * *", () => {
    scheduleFunction();
  });
  scheduleJob("0 59 23 * * *", () => {
    scheduleFunction();
  });

  scheduleJob("0 0 12,15,18,21 * * *", () => {
    scheduleFunction();
  });

  scheduleFunction();
  setInterval(() => {
    scheduleFunction();
  }, 45000);
});

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

server.listen(3000, () => console.log("Server is Ready!"));
