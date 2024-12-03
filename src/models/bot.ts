import { Context } from "telegraf";

export interface SessionData {
  blurRadius: number;
}

export interface BotContext extends Context {
  session?: SessionData;
}
