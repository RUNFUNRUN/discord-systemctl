import { ChatInputCommandInteraction, Client, Events, GatewayIntentBits, type Interaction } from "discord.js";
import { commands } from "./commands";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once(Events.ClientReady, (c: Client) => {
  console.log(`Ready! Logged in as ${c.user?.tag}`);
  c.application?.commands
    .set(commands.map((command) => command.data))
    .then(() => {
      console.log("Commands set.");
    });
});

client.addListener(
  Events.InteractionCreate,
  async (interaction: Interaction) => {
    if (!interaction.isCommand()) {
      return;
    }
    const commandName = interaction.commandName;
    const command = commands.find(
      (command) => command.data.name === commandName,
    );
    if (!command) {
      console.log('commands not found');
      return;
    }
    try {
      await command.execute(interaction as ChatInputCommandInteraction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  },
);

client.login(process.env.DISCORD_TOKEN);
