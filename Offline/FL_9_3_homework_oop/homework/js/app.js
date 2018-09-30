function checkedNumber(whatCheck) {
    return typeof whatCheck === 'number' && whatCheck > 0 && !Number.isNaN(whatCheck) && Number.isFinite(whatCheck);
}

function checkedString(string) {
    return typeof string === 'string' && string.trim().length > 0;
}

function checkedObject(object) {
    return typeof object === 'object';
}

function getDate() {
    return new Date().toLocaleString('en-GB');
}

function Product(productArgsObj) {

    if (!checkedString(productArgsObj.name)) {
        console.error('Name format is invalid. (String only)');
        return;
    }

    if (!checkedObject(productArgsObj.description)) {
        console.error('Description format is invalid. (Object only)');
        return;
    }

    if (!checkedNumber(productArgsObj.price)) {
        console.error('Price format is invalid. (Number only)');
        return;
    }

    let _name = productArgsObj.name,
        _description = productArgsObj.description,
        _price = productArgsObj.price,
        _dateOfAddingToCart = '',
        _shoppingCartInstance = {},
        _log = [];

    this.getName = function () {
        return _name;
    };

    this.getDescription = function () {
        return _description;
    };

    this.getPrice = function () {
        return _price;
    };

    this.getShoppingCartInstance = function () {
        return _shoppingCartInstance;
    };

    this.getAddDate = function () {
        return _dateOfAddingToCart;
    };

    this.setPrice = function (newPrice) {
        if (newPrice > _price) {
            _log.push(`${getDate()} --> The price was changed from ${_price} to ${newPrice}.`);
            _price = newPrice;
        } else {
            _log.push(`${getDate()} --> There was an attempt to change the price from ${_price} to ${newPrice}.`);
            console.error('Price can\'t be set smaller than product costs.');
        }
        return this;
    };

    this.add = function (shoppingCartInstance) {
        _shoppingCartInstance = shoppingCartInstance;
        _dateOfAddingToCart = getDate();
        _log.push(`${_dateOfAddingToCart} --> ${_name} was added to ${_shoppingCartInstance.getCartName()}.`);
        return this;
    };

    this.removeProduct = function () {
        if (_shoppingCartInstance instanceof ShoppingCart) {
            _log.push(`${getDate()} --> ${_name} was removed from ${_shoppingCartInstance.getCartName()}.`);
            _shoppingCartInstance = {};
            _dateOfAddingToCart = '';
        }
        return this;
    };

    this.getHistory = function () {
        if (_log.length > 0) {
            return _log;
        } else {
            console.error('Product log is empty.');
        }
    };
    return this;
}

function ShoppingCart(cartArgsObj) {
    let _name = cartArgsObj.name,
        _owner = cartArgsObj.owner,
        _maxSize = cartArgsObj.maxSize,
        _listOfProducts = [],
        _log = [];

    if (!checkedString(cartArgsObj.name)) {
        console.error('Name field format is invalid. (String only)');
        return;
    }

    if (!checkedString(cartArgsObj.owner)) {
        console.error('Owner field format is invalid. (String only)');
        return;
    }

    if (!checkedNumber(cartArgsObj.maxSize)) {
        console.error('MaxSize field format is invalid. (Number only)');
        return;
    }

    this.addNewProduct = function (productInstance) {
        if (productInstance instanceof Product) {
            if (!_listOfProducts.includes(productInstance)) {
                if (_listOfProducts.length < _maxSize) {
                    if (productInstance.getShoppingCartInstance() instanceof ShoppingCart) {
                        productInstance.getShoppingCartInstance().removeProduct(productInstance);
                    }
                } else {
                    let minPriceProduct = _listOfProducts.reduce(function (p, c) {
                            return p.getPrice() < c.getPrice() ? p : c;
                        }),
                        minPriceProductPosition = _listOfProducts.indexOf(minPriceProduct);
                    _listOfProducts.splice(minPriceProductPosition, 1);
                    minPriceProduct.getShoppingCartInstance().removeProduct(minPriceProduct);
                }
                _listOfProducts.push(productInstance);
                productInstance.add(this);
                _log.push(`${getDate()} --> ${productInstance.getName()} was added to ${_name}.`);
            } else {
                console.error(`The ${productInstance.getName()} has already been added to the shopping cart.`);
                _log.push(`${_owner} tried to put the ${productInstance
                    .getName()} into the ${_name} two times. Alcoholic.`);
            }
        } else {
            console.error('The input object isn\'t an instance of Product.');
        }
        return this;
    };

    this.removeProduct = function (productInstance) {
        if (productInstance instanceof Product) {
            productInstance.removeProduct();
            _listOfProducts = _listOfProducts.filter(item => item !== productInstance);
            _log.push(`${getDate()} --> ${productInstance.getName()} was removed from ${_name}.`);
        } else {
            console.error('The input object isn\'t an instance of Product.');
        }
        return this;
    };

    this.getAveragePrice = function () {
        if (_listOfProducts.length === 0) {
            console.error(`The ${_name} is empty.`);
        } else {
            return this.getTotalPrice() / _listOfProducts.length;
        }
    };

    this.getProducts = function () {
        return _listOfProducts;
    };

    this.getFormattedListOfProducts = function () {
        if (_listOfProducts.length > 0) {
            let formattedListArray = [];
            for (let i = 0; i < _listOfProducts.length; i++) {
                formattedListArray.push(`${_listOfProducts[i]
                .getName()} has been located in ${_listOfProducts[i]
                    .getShoppingCartInstance().getCartName()} since ${_listOfProducts[i]
                        .getAddDate()}. Detailed product description: ${JSON
                            .stringify(_listOfProducts[i].getDescription())}.`);
            }
            return formattedListArray;
        } else {
            console.error('The list of products is empty.');
        }
    };

    this.getTotalPrice = function () {
        switch (_listOfProducts.length) {
            case 0:
                console.error(`The ${_name} is empty.`);
                return;
            case 1:
                return _listOfProducts[0].getPrice();
            default:
                return _listOfProducts.reduce((p, c) => p.getPrice() + c.getPrice());
        }
    };

    this.getHistory = function () {
        if (_log.length > 0) {
            return _log;
        } else {
            console.error('Cart log is empty.');
        }
    };

    this.getCartName = function () {
        return _name;
    };

    _log.push(`${getDate()} --> ${_name} was created.`);
    return this;
}

//DEMO

//Creation of carts
const errorCart = new ShoppingCart({
    name: 5,
    owner: 555,
    maxSize: 'ErrorSize'
}); //error --> creation error

console.log(errorCart);

const juliaShopCart1 = new ShoppingCart({
    name: 'JuliaCart',
    owner: 'Julia',
    maxSize: 3
});

const johnShopCart2 = new ShoppingCart({
    name: 'JohnCart',
    owner: 'John',
    maxSize: 3
});

//Creation of products
const errorProduct = new Product({
    name: true,
    description: 'Wrong description',
    price: '222'
}); //error --> creation error

console.log(errorProduct);

const xiaomiPhone1 = new Product({
    name: 'Redmi Note 5',
    description: {
        color: 'Black',
        size: '6 inches',
        os: 'Android 8.1'
    },
    price: 200
});

const xiaomiPhone2 = new Product({
    name: 'Redmi Note 5',
    description: {
        color: 'Red',
        size: '6 inches',
        os: 'Android 8.1'
    },
    price: 200
});

const samsungPhone1 = new Product({
    name: 'Samsung S9+',
    description: {
        color: 'Coral Blue',
        size: '6.2 inches',
        os: 'Android 8.0'
    },
    price: 710
});

const samsungPhone2 = new Product({
    name: 'Samsung S9+',
    description: {
        color: 'Black',
        size: '6.2 inches',
        os: 'Android 8.0'
    },
    price: 710
});

const iPhone = new Product({
    name: 'iPhone XS Max',
    description: {
        color: 'Silver',
        size: '6.5 inches',
        os: 'iOS 12'
    },
    price: 1450
});

//Empty Formatted
console.table(juliaShopCart1.getFormattedListOfProducts());

console.info('1. JuliaCart || 2. JohnCart');

//Add products
juliaShopCart1
    .addNewProduct(xiaomiPhone1)
    .addNewProduct(xiaomiPhone2)
    .addNewProduct(samsungPhone1)
    .addNewProduct(samsungPhone2)
    .addNewProduct('Instance error.'); //error --> instance error

juliaShopCart1.addNewProduct(iPhone);

johnShopCart2
    .addNewProduct(samsungPhone2)
    .addNewProduct(xiaomiPhone1)
    .addNewProduct(xiaomiPhone1); //error --> same product has been put twice

//Remove products
johnShopCart2
    .removeProduct(samsungPhone2)
    .removeProduct(xiaomiPhone1);

//Set price
xiaomiPhone1.setPrice(180); //error --> lower new price
xiaomiPhone1.setPrice(250);

//Get new price
console.log(xiaomiPhone1.getPrice());

//AveragePrice
console.log(juliaShopCart1.getAveragePrice());
console.log(johnShopCart2.getAveragePrice()); //error --> empty cart

//TotalPrice
console.log(juliaShopCart1.getTotalPrice());
console.log(johnShopCart2.getTotalPrice()); //error --> empty cart

//Formatted
console.table(juliaShopCart1.getFormattedListOfProducts());
console.table(johnShopCart2.getFormattedListOfProducts()); //error --> empty cart

//History
console.table(juliaShopCart1.getHistory());
console.table(johnShopCart2.getHistory());