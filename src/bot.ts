import "dotenv/config";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { Client, Events, GatewayIntentBits } from "discord.js";
import cmnds from "./cmd/commands";
import { server } from "../server";
import { interactionCreateHandler } from "./modules/eventHandlers/interactionCreateHandler";
import { dayStar, jobs_start_all } from "./jobs/jobs";

const TOKEN: any = process.env.BOT_TOKEN;
const CLIENT_ID: any = process.env.CLIENT_ID;
const GUILD_ID: any = process.env.GUILD_ID;

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

client.on("interactionCreate", interactionCreateHandler);

client.on("ready", () => {
  const channel: any = client.channels.cache.find(
    (channel) => channel.id === "1198717350820712478"
  );

  jobs_start_all(channel);
  dayStar(channel);
});

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async function cmds() {
  const commands = cmnds;

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch (err) {
    console.error(err);
  }
})();

client.login(TOKEN);

server.listen(3000, () => console.log("Server is Ready!"));

/*
  14400000 = 4 hours
  10800000 = 3 hours
  function scheduleFunction() {
    const now = moment().tz("Asia/Tbilisi");
    // console.log(now.format("HH:mm:ss"));
    const targetTimes = ["18:28:00","12:00:00", "18:00:00", "21:00:00"];

    if (targetTimes.includes(now.format("HH:mm:ss"))) {
      console.log("autoTriggered");
      topnCmd_chat(channel);
    }
  }
  setInterval(() => {
    scheduleFunction();
  }, 1000);
*/
