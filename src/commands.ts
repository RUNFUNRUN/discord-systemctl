import { SlashCommandBuilder } from "discord.js";
import { $ } from "bun";
import type { Command } from "./types";

export const ping: Command = {
  data: new SlashCommandBuilder().setName("ping").setDescription("test command"),
  execute: async (interaction) => {
    await interaction.reply("pong!");
  }
};

export const start: Command = {
  data: new SlashCommandBuilder().setName("start").setDescription("start systemd"),
  execute: async (interaction) => {
    await interaction.reply("起動してます...");
    await $`sudo systemctl start ${process.env.SYSTEMD_NAME}`;
    await interaction.editReply("起動しました!");
  }
};

export const stop: Command = {
  data: new SlashCommandBuilder().setName("stop").setDescription("stop systemd"),
  execute: async (interaction) => {
    await interaction.reply("停止してます...");
    await $`sudo systemctl stop ${process.env.SYSTEMD_NAME}`;
    await interaction.editReply("停止しました!");
  }
};

export const restart: Command = {
  data: new SlashCommandBuilder().setName("restart").setDescription("restart systemd"),
  execute: async (interaction) => {
    await interaction.reply("再起動してます...");
    await $`sudo systemctl restart ${process.env.SYSTEMD_NAME}`;
    await interaction.editReply("再起動しました!");
  }
};

export const status: Command = {
  data: new SlashCommandBuilder().setName("status").setDescription("status systemd"),
  execute: async (interaction) => {
    await interaction.reply("状態を確認してます...");
    const result = await $`sudo systemctl status ${process.env.SYSTEMD_NAME}`.text();
    await interaction.editReply(`\`\`\`\n${result}\n\`\`\``);
  }
};

export const commands = [ping, start, stop, restart, status];
