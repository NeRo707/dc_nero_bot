export const messageCreateHandler = async (msg: { author: { bot: any; }; reply: (arg0: string) => void; }) => {
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
