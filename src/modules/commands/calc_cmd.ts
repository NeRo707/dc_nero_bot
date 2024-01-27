export const calcCmd = (i: { options: { getString: (arg0: string) => any; }; reply: (arg0: string) => void; }) => {
  const str = i.options.getString("expression");
  
  try {
    const evl = String(eval(str));
    console.log(evl);
    i.reply("```" + evl + "```");
  } catch (err) {
    i.reply("```Invalid expression```");
    console.log(err);
  }

};
