export const messageCreateHandler = async (msg) => {
  const str = String(msg);
  if (msg.author.bot) return

  try {
    const evl = eval(str);
    //console.log(evl);
    msg.reply("```" + evl + "```");
  } catch (err) {
    msg.reply("```Invalid expression```");
    console.log(err);
  }
};
