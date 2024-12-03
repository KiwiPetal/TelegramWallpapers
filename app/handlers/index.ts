import { Composer } from "telegraf";
import { genPicture } from "../utilities/functions";
import { message } from "telegraf/filters";
import { BotContext } from "../models/bot";

const composer = new Composer<BotContext>();

// Blur amount handler
composer.on(message("text"), (ctx) => {
  if (!Number.isInteger(Number(ctx.message.text))) return;
  if (!ctx.session) ctx.session = { blurRadius: Number(ctx.message.text) };
  else ctx.session.blurRadius = Number(ctx.message.text);
});

// Wallpaper handler
composer.on("photo", async (ctx) => {
  let photos = ctx.message.photo;
  const image = photos[photos.length - 1];

  const imageUrl = await ctx.telegram.getFileLink(image.file_id);
  const id = ctx.chat.id;
  genPicture(ctx, {
    height: 2532,
    width: 1170,
    id: id,
    src: imageUrl.href,
    blurRadius: ctx.session?.blurRadius ? ctx.session.blurRadius : 200,
  });
});

export default composer;
