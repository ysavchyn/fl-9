function findType(element) {
    return typeof element;
}

function forEach(array, func) {
    for (let i = 0; i < array.length; i++) {
        func(array[i]);
    }
}

function map(array, func) {
    let newArray = [];
    forEach(array, function (element) {
        newArray.push(func(element));
    });
    return newArray;
}

function filter(array, predicateFunc) {
    let filteredArray = [];
    forEach(array, function (element) {
        if (predicateFunc(element)) {
            filteredArray.push(element);
        }
    });
    return filteredArray;
}

function getAdultAppleLovers(data) {
    return map(filter(data, function (element) {
        return element.age > 18 && element.favoriteFruit === 'apple';
    }), function (element) {
        return element.name;
    });
}

function keys(obj) {
    let keysArray = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            keysArray.push(key);
        }
    }
    return keysArray;
}

function values(obj) {
    let values = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            values.push(obj[key]);
        }
    }
    return values;
}

function showFormattedDate(date) {
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return 'It is ' + date.getDate() + ' of ' + monthArray[date.getMonth()] + ', ' + date.getFullYear();
}