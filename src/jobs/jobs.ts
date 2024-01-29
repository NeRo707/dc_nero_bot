import cron from "node-cron";
import { topnCmd_chat } from "../modules/commands";
import { EmbedBuilder } from "discord.js";
import fs from "fs";
type C = { send: (arg0: { embeds: EmbedBuilder[] }) => void };

const job9 = (c: C) =>
  cron.schedule(
    "00 00 9 * * *",
    () => {
      console.log("autoTriggered");
      topnCmd_chat(c);
    },
    {
      scheduled: true,
      timezone: "Asia/Tbilisi",
    }
  );

const job12 = (c: C) =>
  cron.schedule(
    "00 00 12 * * *",
    () => {
      console.log("autoTriggered");
      topnCmd_chat(c);
    },
    {
      scheduled: true,
      timezone: "Asia/Tbilisi",
    }
  );

const job18 = (c: C) =>
  cron.schedule(
    "00 00 18 * * *",
    () => {
      console.log("autoTriggered");
      topnCmd_chat(c);
    },
    {
      scheduled: true,
      timezone: "Asia/Tbilisi",
    }
  );

const job21 = (c: C) =>
  cron.schedule(
    "00 00 21 * * *",
    () => {
      console.log("autoTriggered");
      topnCmd_chat(c);
    },
    {
      scheduled: true,
      timezone: "Asia/Tbilisi",
    }
  );

const job24 = (c: C) =>
  cron.schedule(
    "59 59 23 * * *",
    () => {
      console.log("autoTriggered");
      topnCmd_chat(c);
    },
    {
      scheduled: true,
      timezone: "Asia/Tbilisi",
    }
  );

export const dayStar = (c: any) => {
  cron.schedule(
    "00 00 00 * * *",
    () => {
      console.log("autoTriggered");
      fs.readFile("stars.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const Star = JSON.parse(data);
        console.log(Star[0][1][0]);
        c.send({
          content: "# 🎉DayStar🎉\n" + "### ✨🏆 " + Star[0][1][0] + " 🏆✨"
        });
      })
    },
    {
      scheduled: true,
      timezone: "Asia/Tbilisi",
    }
  ).start();
};

export const jobs_start_all = (c: C) => {
  job9(c).start();
  job12(c).start();
  job18(c).start();
  job21(c).start();
  job24(c).start();
};

export { job9, job12, job18, job21, job24 };
