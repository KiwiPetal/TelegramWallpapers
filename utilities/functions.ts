import * as StackBlur from "stackblur-canvas";
import { createCanvas, loadImage } from "canvas";
import {
  existsSync,
  writeFileSync,
  unlinkSync
} from "fs";
import {Telegraf} from "telegraf";

export function scalingFactor(dh: number, dw: number, sh: number, sw: number, fit: boolean): number {
  const widthRatio = sw / dw;
  const heightRatio = sh / dh;

  return fit
    ? widthRatio < heightRatio ? widthRatio : heightRatio
    : widthRatio > heightRatio ? widthRatio : heightRatio
}

export interface IpicReq {
  height: number;
  width: number;
  src: string;
  blurRadius: number;
  id: number;
}
export function genPicture(bot: Telegraf, vars: IpicReq) {
  try {
    const canvas = createCanvas(vars.width, vars.height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, vars.width, vars.height);
    if (!ctx) throw new Error("CTX not loaded");

    loadImage(vars.src).then(async (img) => {
      let _height = img.naturalHeight;
      let _width = img.naturalWidth;
      let scaling = scalingFactor(
        _height,
        _width,
        vars.height,
        vars.width,
        false
      );
      _height = _height * scaling;
      _width = _width * scaling;
      let coords = {
        x: (vars.width - _width) / 2,
        y: (vars.height - _height) / 2,
      };
      ctx.drawImage(img, coords.x, coords.y, _width, _height);
      StackBlur.canvasRGB(
        // @ts-ignore
        canvas,
        0,
        0,
        vars.width,
        vars.height,
        vars.blurRadius
      );

      // Foreground
      scaling = scalingFactor(_height, _width, vars.height, vars.width, true);
      _height = _height * scaling;
      _width = _width * scaling;
      coords = {
        x: 0,
        y: (vars.height - _height) / 2,
      };
      ctx.drawImage(img, coords.x, coords.y, _width, _height);

      // Download/Telegram Message
      const buffer = canvas.toBuffer("image/png");
      writeFileSync("./image.png", buffer);
      await bot.telegram.sendPhoto(vars.id, { source: "./image.png" });
      if (existsSync("./image.png"))
        unlinkSync("./image.png");
    });
  } catch (e) {
    console.log(e);
  }
}
