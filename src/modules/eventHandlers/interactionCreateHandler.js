import {
  testCmd,
  aiaCmd,
  calcCmd,
  rankCmd,
  topnCmd,
} from "../commands/index.js";

export const interactionCreateHandler = async (interaction) => {
  if (!interaction.isCommand()) return;
  
  console.log(`Command ${interaction.commandName} was used`);

  switch (interaction.commandName) {
    case "top":
      topnCmd(interaction);
      break;
    case "rank":
      rankCmd(interaction);
      break;
    case "test":
      testCmd(interaction);
      break;
    case "aia":
      aiaCmd(interaction);
      break;
    case "calc":
      calcCmd(interaction);
      break;
    default:
      break;
  }
};
