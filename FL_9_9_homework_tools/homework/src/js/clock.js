class Clock {
  constructor() {
    this.canvasState = new CanvasState();
  }

  setTime(time) {
    this.canvasState.drawClok(time);
  }
}
