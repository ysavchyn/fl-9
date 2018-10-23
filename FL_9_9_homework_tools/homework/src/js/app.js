const clockObj = new Clock();
const container = document.querySelector('.app-wrapper');
container.appendChild(clockObj.canvasState.canvas);

setInterval(() => {
    clockObj.setTime({
    hour: moment().hours(),
    minute: moment().minutes(),
    second: moment().seconds()
});
}, 1000);


