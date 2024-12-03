// Imports {{{

require("dotenv").config();
import {
  existsSync,
  mkdirSync,
} from "fs";
import bot from "./bot";
import imageComposer from "./handlers/index";

// }}}

if (!existsSync("backup/")) {
  mkdirSync("backup/");
}

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
