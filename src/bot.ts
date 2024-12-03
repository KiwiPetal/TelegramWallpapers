import { Telegraf } from "telegraf";
import { BotContext } from "./models/bot";
import { BOT_TOKEN } from "./utilities/validateEnv";
import LocalSession from "telegraf-session-local";
import { existsSync, mkdirSync } from "fs";

const bot: Telegraf<BotContext> = new Telegraf(BOT_TOKEN, {
  telegram: { webhookReply: false },
});

// LocalSession setup
if (!existsSync("../backup/")) {
  mkdirSync("../backup/");
}
const localSession = new LocalSession({
  database: "../backup/sessionDB.json",
  property: "session",
});
bot.use(localSession.middleware());

// Logging setup
bot.use(async (ctx, next) => {
  const start = Date.now();
  const id = ctx.chat?.id!;
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`${id}: Response time ${ms}ms`);
  });
});

// Error handling
bot.catch((err, ctx) => {
  console.log("Error", err);
});

export default bot;
