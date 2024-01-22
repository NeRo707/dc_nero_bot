
const API = process.env.API;

export const aiaCmd = async (i) => {
  const problem = i.options.getString("problem");
    const res = await fetch(`${API}/problem/${problem}`);
  const prob = await res.json();
  //console.log(prob);
    try {
      await i.deferReply({ ephemeral: true });
      i.editReply({
        content: `\n# ${prob.title}: ***${prob.id}***\n ${prob.statement}\n# ${
          prob.input_description
        }\n## ${prob.output_description}\n### Tags:${prob.tags.map(
          (t) => "\t" + t.title + "\t"
        )}\n## ნიმუშები:\n${prob.samples.map(
          (s) =>
            "\n## in: \n" +
            "```" +
            s.input +
            "```" +
            "\n## out: \n" +
            "```" +
            s.output +
            "```" +
            "\n"
        )}`,
      });
    } catch (err) {
      i.editReply("Error: " + prob.message);
      console.log(err);
    }
}