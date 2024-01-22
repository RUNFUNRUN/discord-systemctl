import { ChatInputCommandInteraction } from "discord.js";

export type Command = {
  data: { name: string; description: string };
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
};
