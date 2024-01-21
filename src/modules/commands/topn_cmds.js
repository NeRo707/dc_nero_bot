import axios from "axios";
import moment from "moment";
import { EmbedBuilder } from "discord.js";

export const topnCmd = async (i) => {

  const statsmp = new Map([]);
  await i.deferReply({ ephemeral: true });
  try {
    let pg = 1;
    let todaysDate = moment().format("YYYY-MM-DD");
    let stopFetching = false;

    while (!stopFetching) {
      const res = await axios.get(`https://api.aiasoft.ge/submissions/${pg}`);
      const submissions = res.data.submissions;

      for (const submission of submissions) {
        const submissionDate = moment(submission.datetime).format("YYYY-MM-DD");

        if (submissionDate !== todaysDate) {
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
    const top6 = [...statsmp.entries()]
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
      .setDescription("# Today's Top 6 AiaSofters")
      .setThumbnail("https://www.aiasoft.ge/logo.png")
      .addFields(
        { name: "Rank", value: "\u2009", inline: true },
        { name: "Passed", value: "\u2009", inline: true },
        { name: "Failed", value: "\u2009", inline: true },
        { name: "\u2009", value: "\u2009", inline: false }
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
        { name: `\t\t${failed}`, value: "\t", inline: true }
      );
    });
    i.editReply({ embeds: [embed] });
    
  } catch (err) {
    console.log(err);
  }

  return;
};

export const topnCmd_chat = async (channel) => {
  const statsmp = new Map([]);
  try {
    let pg = 1;
    let todaysDate = moment().format("YYYY-MM-DD");
    let stopFetching = false;

    while (!stopFetching) {
      const res = await axios.get(`https://api.aiasoft.ge/submissions/${pg}`);
      const submissions = res.data.submissions;

      for (const submission of submissions) {
        const submissionDate = moment(submission.datetime).format("YYYY-MM-DD");

        if (submissionDate !== todaysDate) {
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
    const top6 = [...statsmp.entries()]
      .sort((a, b) => b[1].passed - a[1].passed)
      .slice(0, 6);
    top6 = [...statsmp.entries()]
      .sort((a, b) => a[1].failed - b[1].failed)

    
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("AiaTopSix")
      .setURL("https://aiasoft.ge/")
      .setAuthor({
        name: "Aiasoft",
        iconURL: "https://www.aiasoft.ge/logo.png",
        url: "https://github.com/nero707",
      })
      .setDescription("# Today's Top 6 AiaSofters")
      .setThumbnail("https://www.aiasoft.ge/logo.png")
      .addFields(
        { name: "Rank", value: "\u2009", inline: true },
        { name: "Passed", value: "\u2009", inline: true },
        { name: "Failed", value: "\u2009", inline: true },
        { name: "\u2009", value: "\u2009", inline: false }
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
        { name: `\t\t${failed}`, value: "\t", inline: true }
      );
    });
    channel.send({ embeds: [embed] });
  } catch (err) {
    console.log(err);
  }

  return;
};
