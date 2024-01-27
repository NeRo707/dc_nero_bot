import axios from "axios";

const API = process.env.API;
const USR = process.env.USR;
const PASS = process.env.PASS;

export const testCmd = async (i: { options: { getString: (arg0: string) => string; }; deferReply: (arg0: { ephemeral: boolean; }) => any; editReply: (arg0: { content: string; }) => void; }) => {
  const index = i.options.getString("index");
  let code = i.options.getString("code").replace(".h>", ".h>\n");

  // console.log(code);

  // console.log(PASS);
  // console.log(USR);
  const res = await axios.post(`${API}/login`, {
    username: USR,
    password: PASS,
  });
  // console.log(res);
  const token = await res.data.access_token;
  // console.log(token);
  if (res.status === 200) {
    console.log("Logged in");
  }
  debugger;
  try {
    await i.deferReply({ ephemeral: true });
    const upload = await axios.post(
      `${API}/submission`,
      {
        problem_id: index,
        code: code,
        language: "C++",
        version: "17",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(upload.data);
    const { id, verdict_en, memory, time, problem_id, datetime } = upload.data;
    const uploadDate = new Date(datetime);
    const formatted_date = uploadDate.toLocaleString("en-US");
    i.editReply({
      content: `# Verdict: ${verdict_en}\nProblem ID:\t ${problem_id}\nSubmission ID: ${id}\nMemory:\t\t ${memory}\nTime:\t\t\t\t${time}\nDateTime: ${formatted_date}`,
    });
  } catch (err: any) {
    i.editReply({
      content: "# " + err.response.message,
    });
    console.log(err.message);
    console.log("---------------ERROR HAPPENED---------------------");
  }
};
