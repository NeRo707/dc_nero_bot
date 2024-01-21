import axios from 'axios';

export const testCmd = async (i) => {
  const index = i.options.getString("index");
  let code = i.options.getString("code").replace(".h>", ".h>\n");
  
  //console.log(code);

  const res = await axios.post("https://api.aiasoft.ge/login", {
    username: "numa",
    password: "13245",
  });
  const token = await res.data.access_token;
  //console.log(token);
  if (res.status === 200) {
    console.log("Logged in");
  }

  try {
    await i.deferReply({ ephemeral: true });
    const upload = await axios.post(
      "https://api.aiasoft.ge/submission",
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
  } catch (err) {
    i.editReply({
      content: "# " + err.response.data.message,
    });
    //console.log(err);
    console.log("---------------ERROR HAPPENED---------------------");
  }
};
