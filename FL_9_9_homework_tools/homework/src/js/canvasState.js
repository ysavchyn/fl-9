class CanvasState {
  constructor() {
    this.canvas = this._createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.radius = this.canvas.height / 2;
    this.ctx.translate(this.radius, this.radius);
  }

  drawClok(configs) {
    this._drawClockFrame();
    this._drawNumbers();
    this._drawTime(configs);
  }

  _drawClockFrame() {
    this.ctx.fillStyle = '#666';
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#fff';
    this.ctx.fill();
  }

  _drawTime(configs) {
    let { hour, minute, second } = configs;

    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    this._drawHand(hour, this.radius * 0.5, this.radius * 0.07);

    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this._drawHand(minute, this.radius * 0.75, this.radius * 0.05);

    second = (second * Math.PI / 30);
    this._drawHand(second, this.radius * 0.9, this.radius * 0.02);
  }

  _drawNumbers() {
    let ang, num;

    this.ctx.font = '19px arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';

    for (num = 1; num < 13; num++) {
      ang = num * Math.PI / 6;
      this.ctx.rotate(ang);
      this.ctx.translate(0, -this.radius * 0.85);
      this.ctx.rotate(-ang);
      this.ctx.fillText(num.toString(), 0, 0);
      this.ctx.rotate(ang);
      this.ctx.translate(0, this.radius * 0.85);
      this.ctx.rotate(-ang);
    }
  }

  _drawHand(pos, length, width) {
    this.ctx.strokeStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.lineWidth = width;
    this.ctx.lineCap = 'round';
    this.ctx.moveTo(0, 0);
    this.ctx.rotate(pos);
    this.ctx.lineTo(0, -length);
    this.ctx.stroke();
    this.ctx.rotate(-pos);
  }

  _createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.height = 350;
    canvas.width = 350;
    canvas.classList.add('clock');

    return canvas;
  }
} 
