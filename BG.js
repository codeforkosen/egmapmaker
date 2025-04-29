import { loadImage } from "./loadImage.js";


export class BG {
  static async create(canvas, nw = 16, nh = 16) {
    const cw = 16;
    const cwh = cw / 2;
    const sw = nw * cw;
    const sh = nh * cw;

    canvas.width = sw;
    canvas.height = sh;
    canvas.style.width = "100vw";
    canvas.style.height = "100vw";
    canvas.style.imageRendering = "pixelated";
    const g = canvas.getContext("2d");
    g.imageSmoothingEnabled = false;

    const base = "tuti1";
    //const put = "kusa1";
    const put = "mizu1";

    const imgkusa = await loadImage("mapchip2/MapChip/" + put + ".png");
    const imgbase = await loadImage("mapchip2/MapChip/" + base + ".png");
    const imgs = {};
    imgs[put] = imgkusa;
    imgs[base] = imgbase;

    const map = new Array(nw * nw);
    for (let i = 0; i < map.length; i++) {
      map[i] = Math.random() < .3 ? put : base;
    }

    const getChip = (x, y) => {
      x = (x + nw) % nw;
      y = (y + nw) % nw;
      //if (x < 0 || x >= nw || y < 0 || y >= nw) return base;
      return map[x + y * nw];
    };

    const drawBG = (tick) => {
      g.clearRect(0, 0, sw, sh);
      for (let y = 0; y < nw; y++) {
        for (let x = 0; x < nw; x++) {
          const n = 4;
          const img = imgs[getChip(x, y)];
          const nimg = img.width / cw;
          g.drawImage(img, tick % nimg * cw, n * cw, cw, cw, x * cw, y * cw, cw, cw);
        }
      }

      const drawChip = (imgname, n, x, y) => {
        const img = imgs[imgname];
        const nimg = img.width / cw;
        g.drawImage(img, n % 2 * cwh + tick % nimg * cw, Math.floor(n / 2) * cwh, cwh, cwh, x, y, cwh, cwh);
      };
      const drawPut1 = () => {
        for (let y = 0; y < nw; y++) {
          for (let x = 0; x < nw; x++) {
            const img = getChip(x, y);
            const imgup = getChip(x, y - 1);
            const imgdown = getChip(x, y + 1);
            const imgright = getChip(x + 1, y);
            const imgleft = getChip(x - 1, y);
            const imgupright = getChip(x + 1, y - 1);
            const imgupleft = getChip(x - 1, y - 1);
            const imgdownright = getChip(x + 1, y + 1);
            const imgdownleft = getChip(x - 1, y + 1);
            if (img == base && imgup == put) {
              if (imgleft == put) {
                drawChip(put, 15, x * cw, y * cw);
              } else {
                drawChip(put, 10, x * cw, y * cw);
              }
              if (imgright == put) {
                drawChip(put, 14, x * cw + cwh, y * cw);
              } else {
                drawChip(put, 11, x * cw + cwh, y * cw);
              }
            }
            if (img == base && imgdown == put) {
              if (imgleft == put) {
                drawChip(put, 13, x * cw, y * cw + cwh);
              } else {
                drawChip(put, 8, x * cw, y * cw + cwh);
              }
              if (imgright == put) {
                drawChip(put, 12, x * cw + cwh, y * cw + cwh);
              } else {
                drawChip(put, 9, x * cw + cwh, y * cw + cwh);
              }
            }
            if (img == base && imgright == put) {
              if (imgup != put) drawChip(put, 4, x * cw + cwh, y * cw);
              if (imgdown != put) drawChip(put, 6, x * cw + cwh, y * cw + cwh);
            }
            if (img == base && imgleft == put) {
              if (imgup != put) drawChip(put, 5, x * cw, y * cw);
              if (imgdown != put) drawChip(put, 7, x * cw, y * cw + cwh);
            }
            if (img == base && imgupright == put && imgup == base && imgright == base) {
              drawChip(put, 2, x * cw + cwh, y * cw);
            }
            if (img == base && imgupleft == put && imgup == base && imgleft == base) {
              drawChip(put, 3, x * cw, y * cw);
            }
            if (img == base && imgdownright == put && imgdown == base && imgright == base) {
              drawChip(put, 0, x * cw + cwh, y * cw + cwh);
            }
            if (img == base && imgdownleft == put && imgdown == base && imgleft == base) {
              drawChip(put, 1, x * cw, y * cw + cwh);
            }
          }
        }
      };
      drawPut1();
    };
    return new BG(drawBG, map, base, put);
  }
  constructor(drawBG, map, base, put) {
    this.drawBG = drawBG;
    this.map = map;
    this.base = base;
    this.put = put;
    this.tick = 0;
  }
  setMapRandom() {
    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = Math.random() < .3 ? this.put : this.base;
    }
  }
  setMapInt(values) {
    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = values[i] ? this.put : this.base;
    }
  }
  draw() {
    this.drawBG(this.tick++);
  }
};
