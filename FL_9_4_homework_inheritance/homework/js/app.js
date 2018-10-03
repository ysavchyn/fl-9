function assign(target) {
    if (target === null && target === undefined) {
        throw 'Cannot convert undefined or null to object';
    }
    let result = new Object(target);
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] !== null && arguments[i] !== undefined) {

            for (let nextKey in arguments[i]) {
                if (Object.prototype.hasOwnProperty.call(arguments[i], nextKey)) {
                    result[nextKey] = arguments[i][nextKey];
                }
            }
        }
    }
    return result;
}

function checkDirection(direction) {
    return typeof direction === 'string' && direction.trim().length > 0;
}

function checkCoordinates(x, y) {
    if (typeof x === 'number' && !Number.isNaN(x) && Number.isFinite(x) &&
        typeof y === 'number' && !Number.isNaN(y) && Number.isFinite(y)) {
        return true;
    } else {
        return false;
    }
}

function checkSpeed(speed) {
    return typeof speed === 'number' && speed >= 0 && !Number.isNaN(speed) && Number.isFinite(speed);
}

function extend(Child, Parent) {
    let F = function () {
        return;
    };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

function Bot(paramsObj) {
    let _name = paramsObj.name,
        _speed = paramsObj.speed,
        _x = paramsObj.x,
        _y = paramsObj.y,
        _type = paramsObj.type || 'Bot';

    const _defaultSpeed = paramsObj.speed;

    this.getName = function () {
        return _name;
    }

    this.getType = function () {
        return _type;
    }

    this.getSpeed = function () {
        return _speed;
    }

    this.setSpeed = function (newSpeed) {
        if (checkSpeed(newSpeed)) {
            _speed = newSpeed;
        } else {
            throw 'newSpeed must be a Number only and >= 0.';
        }
    }

    this.getDefaultSpeed = function () {
        return _defaultSpeed;
    }

    this.getCoordinates = function () {
        return {
            x: _x,
            y: _y
        }
    }

    this.setCoordinates = function (x, y) {
        if (checkCoordinates(x, y)) {
            _x = x;
            _y = y;
        } else {
            throw 'x | y must be a Number only and >= 0.';
        }
    }
}

Bot.prototype.showPosition = function () {
    return `I am ${this.getType()} '${this.getName()}'. I am located at ${this.getCoordinates().x}:${this
        .getCoordinates().y}.`;
}

Bot.prototype.move = function (direction, context) {
    context = context || this;
    if (checkDirection(direction)) {
        switch (direction) {
            case 'up':
                context.setCoordinates(context.getCoordinates().x, context.getCoordinates().y + context.getSpeed());
                break;
            case 'down':
                context.setCoordinates(context.getCoordinates().x, context.getCoordinates().y - context.getSpeed());
                break;
            case 'right':
                context.setCoordinates(context.getCoordinates().x + context.getSpeed(), context.getCoordinates().y);
                break;
            case 'left':
                context.setCoordinates(context.getCoordinates().x - context.getSpeed(), context.getCoordinates().y);
                break;
            default:
                throw 'direction can accept 1 of 4 possible directions (up, down, left, right)'
        }
    } else {
        throw 'direction must be a String only.';
    }
}

function Racebot(paramsObj) {
    this.previousDirection = '';
    Racebot.superclass.constructor.call(this, paramsObj);
}

function Speedbot(paramsObj) {
    Speedbot.superclass.constructor.call(this, paramsObj);
    this.engineLvl = 0;
}

extend(Racebot, Bot);
extend(Speedbot, Bot);

Racebot.prototype.move = function (direction) {
    if (checkDirection(direction)) {
        if (direction !== this.previousDirection) {
            this.setSpeed(this.getDefaultSpeed());
            this.previousDirection = direction;
        } else {
            this.setSpeed(this.getSpeed() + 1);
        }
        Racebot.superclass.move(direction, this);
    } else {
        throw 'direction must be a String only.';
    }
}

Speedbot.prototype.prepareEngine = function () {
    this.setSpeed(this.getSpeed() + 2);
    this.turboDisable = false;
}

Speedbot.prototype.move = function (direction) {
    Speedbot.superclass.move(direction, this);
    this.turboDisable = true;
    if (this.turboDisable) {
        if (this.getSpeed() !== this.getDefaultSpeed()) {
            this.setSpeed(this.getSpeed() - 1);
        }
    }
}