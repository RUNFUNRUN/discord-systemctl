import { SlashCommandBuilder } from "discord.js";
import { $ } from "bun";
import type { Command } from "./types";

export const ping: Command = {
  data: new SlashCommandBuilder().setName("ping").setDescription("test command"),
  execute: async (interaction) => {
    await interaction.reply("pong!");
    console.log("/ping called");
  }
};

export const start: Command = {
  data: new SlashCommandBuilder().setName("start").setDescription("start systemd"),
  execute: async (interaction) => {
    await interaction.reply("起動してます...");
    console.log("/start called");
    await $`sudo systemctl start ${process.env.SYSTEMD_NAME}`;
    await interaction.editReply("起動しました!");
    console.log("systemd started");
  }
};

export const stop: Command = {
  data: new SlashCommandBuilder().setName("stop").setDescription("stop systemd"),
  execute: async (interaction) => {
    await interaction.reply("停止してます...");
    console.log("/stop called");
    await $`sudo systemctl stop ${process.env.SYSTEMD_NAME}`;
    await interaction.editReply("停止しました!");
    console.log("systemd stopped");
  }
};

export const restart: Command = {
  data: new SlashCommandBuilder().setName("restart").setDescription("restart systemd"),
  execute: async (interaction) => {
    await interaction.reply("再起動してます...");
    console.log("/restart called");
    await $`sudo systemctl restart ${process.env.SYSTEMD_NAME}`;
    await interaction.editReply("再起動しました!");
    console.log("systemd restarted");
  }
};

export const status: Command = {
  data: new SlashCommandBuilder().setName("status").setDescription("status systemd"),
  execute: async (interaction) => {
    await interaction.reply("状態を確認してます...");
    console.log("/status called");
    let result = await $`sudo systemctl status ${process.env.SYSTEMD_NAME}`.text();
    if (result.length > 1990) {
      result = result.slice(0, 1990);
    }
    await interaction.editReply(`\`\`\`\n${result}\n\`\`\``);
    console.log("systemd status");
  }
};

export const commands = [ping, start, stop, restart, status];
