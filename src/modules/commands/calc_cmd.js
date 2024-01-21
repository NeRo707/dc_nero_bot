export const calcCmd = (i) => {
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
