// Imports {{{

require("dotenv").config();
import { Context, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import {
  existsSync,
  mkdirSync,
} from "fs";
import { genPicture } from "./utilities/functions";
import LocalSession from "telegraf-session-local";

// }}}

// Telegraf setup {{{
export interface SessionData {
  blurRadius: number;
}

export interface BotContext extends Context {
  session?: SessionData;
}

const bot: Telegraf<BotContext> = new Telegraf(process.env.BOT_TOKEN!, {
  telegram: { webhookReply: false },
});

if (!existsSync("backup/")) {
  mkdirSync("backup/");
}

const localSession = new LocalSession({
  database: "backup/sessionDB.json",
  property: "session",
});
bot.use(localSession.middleware());

bot.use(async (ctx, next) => {
  const start = Date.now();
  const id = ctx.chat?.id!;
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`${id}: Response time ${ms}ms`);
  });
});

bot.catch((err, ctx) => {
  console.log("Error", err);
});
// }}}

bot.on(message("text"), (ctx) => {
  if (!Number.isInteger(Number(ctx.message.text))) return;
  if (!ctx.session) ctx.session = { blurRadius: Number(ctx.message.text) };
  else ctx.session.blurRadius = Number(ctx.message.text);
});
bot.on("photo", async (ctx) => {
  let photos = ctx.message.photo;
  const image = photos[photos.length - 1];

  const imageUrl = await ctx.telegram.getFileLink(image.file_id);
  const id = ctx.chat.id;
  genPicture(bot, {
    height: 2532,
    width: 1170,
    id: id,
    src: imageUrl.href,
    blurRadius: ctx.session?.blurRadius ? ctx.session.blurRadius : 200,
  });
});

bot.launch();
console.log("Bot Launched!");

// Graceful stop {{{
process.once("SIGINT", () => {
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  bot.stop("SIGTERM");
});
// }}}
