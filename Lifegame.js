export class Lifegame {
  constructor(nw, nh) {
    this.map = new Array(nw * nh);
    this.map2 = new Array(nw * nh);
    this.nw = nw;
    this.nh = nh;
    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = 0;
    }
    this.setRandom();
  }
  setRandom() {
    for (let i = 0; i < this.map.length; i++) {
      if (!this.map[i] && Math.random() < 0.2) {
        this.map[i] = 1;
      }
    }
  }
  tick() {
    const nw = this.nw;
    const nh = this.nh;
    const get = (x, y) => {
      x = (x + nw) % nw;
      y = (y + nw) % nw;
      return this.map[x + y * nw];
    }
    for (let i = 0; i < nh; i++) {
      for (let j = 0; j < nw; j++) {
        let n = 0;
				n += get(j - 1, i - 1);
				n += get(j, i - 1);
				n += get(j + 1, i - 1);
				n += get(j - 1, i);
				n += get(j + 1, i);
				n += get(j - 1, i + 1);
				n += get(j, i + 1);
				n += get(j + 1, i + 1);
				if (n == 3) {
          this.map2[i * nw + j] = 1;
        } else if (n == 2 && this.map[i * nw + j] == 1) {
					this.map2[i * nw + j] = 1;
        } else {
					this.map2[i * nw + j] = 0;
        }
      }
    }
    const tmp = this.map;
    this.map = this.map2;
    this.map2 = tmp;
  }
  getMap() {
    return this.map;
  }
}
