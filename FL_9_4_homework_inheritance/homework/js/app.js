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

function Bot(paramsObj, type) {
    let _name = paramsObj.name,
        _speed = paramsObj.speed,
        _x = paramsObj.x,
        _y = paramsObj.y,
        _type = type || 'Bot';

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

Bot.prototype.move = function (direction) {
    if (checkDirection(direction)) {
        switch (direction) {
            case 'up':
                this.setCoordinates(this.getCoordinates().x, this.getCoordinates().y + this.getSpeed());
                break;
            case 'down':
                this.setCoordinates(this.getCoordinates().x, this.getCoordinates().y - this.getSpeed());
                break;
            case 'right':
                this.setCoordinates(this.getCoordinates().x + this.getSpeed(), this.getCoordinates().y);
                break;
            case 'left':
                this.setCoordinates(this.getCoordinates().x - this.getSpeed(), this.getCoordinates().y);
                break;
            default:
                throw 'direction can accept 1 of 4 possible directions (up, down, left, right)';
        }
    } else {
        throw 'direction must be a String only.';
    }
}

function Racebot(paramsObj) {
    let _previousDirection = '';

    Racebot.superclass.constructor.call(this, paramsObj, 'Racebot');

    this.getPreviousDirection = function () {
        return _previousDirection;
    }

    this.setPreviousDirection = function (direction) {
        if (checkDirection(direction)) {
            if (direction === 'up' || 'down' || 'left' || 'right') {
                _previousDirection = direction;
            } else {
                throw 'direction can accept 1 of 4 possible directions (up, down, left, right)';
            }
        } else {
            throw 'direction must be a String only.';
        }
    }
}

function Speedbot(paramsObj) {
    Speedbot.superclass.constructor.call(this, paramsObj, 'Speedbot');
}

extend(Racebot, Bot);
extend(Speedbot, Bot);

Racebot.prototype.move = function (direction) {
    if (checkDirection(direction)) {
        if (direction !== this.getPreviousDirection()) {
            this.setSpeed(this.getDefaultSpeed());
            this.setPreviousDirection(direction);
        } else {
            this.setSpeed(this.getSpeed() + 1);
        }
        Racebot.superclass.move.call(this, direction);
    } else {
        throw 'direction must be a String only.';
    }
}

Speedbot.prototype.prepareEngine = function () {
    this.setSpeed(this.getSpeed() + 2);
}

Speedbot.prototype.move = function (direction) {
    Speedbot.superclass.move.call(this, direction);
    if (this.getSpeed() !== this.getDefaultSpeed()) {
        this.setSpeed(this.getSpeed() - 1);
    }
}