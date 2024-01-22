import axios from "axios";
import moment from "moment-timezone";
import { EmbedBuilder } from "discord.js";

const api = process.env.API;

export const topnCmd = async (i) => {
  const statsmp = new Map([]);
  await i.deferReply({ ephemeral: true });
  try {
    let pg = 1;

    let now_utc = moment().utc();
    let tbilisi_tz = "Asia/Tbilisi";
    let timestamp = now_utc.tz(tbilisi_tz);

    console.log("RealTime: ", timestamp.format("MMMM Do YYYY, h:mm:ss a"));

    let todaysDate = moment().tz("Asia/Tbilisi").startOf("day");

    console.log("Todays Date ", todaysDate.format("MMMM Do YYYY, h:mm:ss a"));
    let stopFetching = false;

    while (!stopFetching) {
      const res = await axios.get(`${api}/submissions/${pg}`);
      const submissions = res.data.submissions;
      //console.log(submissions);
      for (const submission of submissions) {
        const submissionDate = moment(submission.datetime);
        //console.log("submissionDate ", submissionDate);

        if (submissionDate.isBefore(todaysDate)) {
          stopFetching = true;
          break;
        }

        const { username, verdict_code } = submission;
        const userStats = statsmp.get(username) || { passed: 0, failed: 0 };

        if (verdict_code === 0) {
          userStats.passed += 1;
        } else {
          userStats.failed += 1;
        }

        statsmp.set(username, userStats);
        // Process the submission data as needed
        //console.log(submission);
      }

      pg++;
    }
  } catch (err) {
    console.log(err);
  }

  //console.log(statsmp);
  try {
    let top6 = [...statsmp.entries()]
      .sort((a, b) => {
        // First, sort by the number of correct answers in descending order
        if (b[1].passed !== a[1].passed) {
          return b[1].passed - a[1].passed;
        }
        // If the number of correct answers is the same, then sort by the number of fails in ascending order
        return a[1].failed - b[1].failed;
      })
      .slice(0, 6);

    console.log(top6);

    //console.log(top6[0][1].passed);
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("AiaTops")
      .setURL("https://aiasoft.ge/")
      .setAuthor({
        name: "Aiasoft",
        iconURL: "https://www.aiasoft.ge/logo.png",
        url: "https://github.com/nero707",
      })
      .setDescription("# Current Top 6 AiaSofters")
      .setThumbnail("https://www.aiasoft.ge/logo.png")
      .addFields(
        { name: "Rank", value: "\u2009", inline: true },
        { name: "Passed", value: "\u2009", inline: true },
        { name: "Failed", value: "\u2009", inline: true },
        { name: "\u2009", value: "\u2009", inline: false },
      )
      .setTimestamp()
      .setFooter({
        text: "Stats as of now...",
        iconURL: "https://www.aiasoft.ge/logo.png",
      });

    top6.forEach(([username, { passed, failed }], index) => {
      const medal = ["🏆", "🥈", "🥉", "🏅", "🎖️", "🎖️"][index];
      embed.addFields(
        { name: `${medal}\t${username}`, value: "\t", inline: true },
        { name: `\t\t${passed}`, value: "\t", inline: true },
        { name: `\t\t${failed}`, value: "\t", inline: true },
      );
    });
    i.editReply({ embeds: [embed] });
  } catch (err) {
    console.log(err);
  }
};

export const topnCmd_chat = async (channel) => {
  const statsmp = new Map([]);
  try {
    let pg = 1;
    let todaysDate = moment().tz("Asia/Tbilisi").startOf("day");
    console.log("Todays Date ", todaysDate);
    let stopFetching = false;

    while (!stopFetching) {
      const res = await axios.get(`${api}/submissions/${pg}`);
      const submissions = res.data.submissions;
      //console.log(submissions);
      for (const submission of submissions) {
        const submissionDate = moment(submission.datetime);
        //console.log("submissionDate ", submissionDate);

        if (submissionDate.isBefore(todaysDate)) {
          stopFetching = true;
          break;
        }

        const { username, verdict_code } = submission;
        const userStats = statsmp.get(username) || { passed: 0, failed: 0 };

        if (verdict_code === 0) {
          userStats.passed += 1;
        } else {
          userStats.failed += 1;
        }

        statsmp.set(username, userStats);
      }

      pg++;
    }
  } catch (err) {
    console.log(err);
  }

  try {
    let top6 = [...statsmp.entries()]
      .sort((a, b) => b[1].passed - a[1].passed)
      .slice(0, 6);

    top6.sort((a, b) => a[1].failed - b[1].failed);

    console.log(top6);

    //console.log(top6[0][1].passed);
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("AiaTops")
      .setURL("https://aiasoft.ge/")
      .setAuthor({
        name: "Aiasoft",
        iconURL: "https://www.aiasoft.ge/logo.png",
        url: "https://github.com/nero707",
      })
      .setDescription("# Current Top 6 AiaSofters")
      .setThumbnail("https://www.aiasoft.ge/logo.png")
      .addFields(
        { name: "Rank", value: "\u2009", inline: true },
        { name: "Passed", value: "\u2009", inline: true },
        { name: "Failed", value: "\u2009", inline: true },
        { name: "\u2009", value: "\u2009", inline: false },
      )
      .setTimestamp()
      .setFooter({
        text: "Stats as of now...",
        iconURL: "https://www.aiasoft.ge/logo.png",
      });

    top6.forEach(([username, { passed, failed }], index) => {
      const medal = ["🏆", "🥈", "🥉", "🏅", "🎖️", "🎖️"][index];
      embed.addFields(
        { name: `${medal}\t${username}`, value: "\t", inline: true },
        { name: `\t\t${passed}`, value: "\t", inline: true },
        { name: `\t\t${failed}`, value: "\t", inline: true },
      );
    });
    channel.send({ embeds: [embed] });
  } catch (err) {
    console.log(err);
  }

  return;
};
