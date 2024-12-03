// Imports {{{
require("dotenv").config();
import bot from "./bot";
import imageComposer from "./handlers/index";
// }}}

bot.use(imageComposer);

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
