import axios from "axios";

const API = process.env.API;

export const rankCmd = async (i) => {
  const usr = i.options.getString("username");

  let pgnum = 1;
  try {
    await i.deferReply({ ephemeral: true });
    while (!_user) {
      const res = await axios.get(`${API}/rating/${pgnum}`);
      var _user = res.data.users.find((user) => user.username === usr);
      pgnum++;
    }
    i.editReply(
      `# Rank: ${_user.rank}\nUsername:\t`+`***`+`${_user.username}`+`***`+`\nAttemts:\t\t${_user.attempts}\nAccepted: \t${_user.accepted}\n`
    );
    console.log(_user);
  } catch (err) {
    i.editReply("User not found");
    console.log(err);
  }

  // console.log(res.data.users);
};
