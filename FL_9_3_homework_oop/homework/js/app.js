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

function Product(name, description, price) {

    if (!checkedString(name)) {
        throw 'Name format is invalid. (String only)';
    }

    if (!checkedObject(description)) {
        throw 'Description format is invalid. (Object only)';
    }

    if (!checkedNumber(price)) {
        throw 'Price format is invalid. (Number only)';
    }

    let _name = name,
        _description = description,
        _price = price,
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
        if (checkedNumber(newPrice)) {
            if (newPrice > _price) {
                _log.push(`${getDate()} --> The price was changed from ${_price} to ${newPrice}.`);
                _price = newPrice;
            } else {
                _log.push(`${getDate()} --> There was an attempt to change the price from ${_price} to ${newPrice}.`);
                throw 'Price can\'t be set smaller or equals than product costs.';
            }
        } else {
            throw 'New price format is invalid. (Number only)';
        }
        return this;
    };

    this.add = function (shoppingCartInstance) {
        if (shoppingCartInstance instanceof ShoppingCart) {
            _shoppingCartInstance = shoppingCartInstance;
            _dateOfAddingToCart = getDate();
            _log.push(`${_dateOfAddingToCart} --> ${_name} was added to ${_shoppingCartInstance.getCartName()}.`);
        }
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
            throw 'Product log is empty.';
        }
    };
    return this;
}

function ShoppingCart(name, owner, maxSize) {

    if (!checkedString(name)) {
        throw 'Name field format is invalid. (String only)';
    }

    if (!checkedString(owner)) {
        throw 'Owner field format is invalid. (String only)';
    }

    if (!checkedNumber(maxSize)) {
        throw 'MaxSize field format is invalid. (Number only)';
    }

    let _name = name,
        _owner = owner,
        _maxSize = maxSize,
        _listOfProducts = [],
        _log = [];

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
                    });
                    minPriceProduct.getShoppingCartInstance().removeProduct(minPriceProduct);
                }
                productInstance.add(this);
                _listOfProducts.push(productInstance);
                _log.push(`${getDate()} --> ${productInstance.getName()} was added to ${_name}.`);
            } else {
                _log.push(`${_owner} tried to put the ${productInstance
                    .getName()} into the ${_name} two times. Alcoholic.`);
                throw `The ${productInstance.getName()} has already been added to the shopping cart.`;
            }
        } else {
            throw 'The input object isn\'t an instance of Product.';
        }
        return this;
    };

    this.removeProduct = function (productInstance) {
        if (productInstance instanceof Product) {
            if (_listOfProducts.includes(productInstance)) {
                productInstance.removeProduct();
                _listOfProducts = _listOfProducts.filter(item => item !== productInstance);
                _log.push(`${getDate()} --> ${productInstance.getName()} was removed from ${_name}.`);
            } else {
                throw `${_name} doesn't include the ${productInstance.getName()}`;
            }
        } else {
            throw 'The input object isn\'t an instance of Product.';
        }
        return this;
    };

    this.getAveragePrice = function () {
        if (_listOfProducts.length === 0) {
            throw `The ${_name} is empty.`;
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
            throw 'The list of products is empty.';
        }
    };

    this.getTotalPrice = function () {
        switch (_listOfProducts.length) {
            case 0:
                throw `The ${_name} is empty.`;
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
            throw 'Cart log is empty.';
        }
    };

    this.getCartName = function () {
        return _name;
    };

    _log.push(`${getDate()} --> ${_name} was created.`);
    return this;
}

//DEMO --> All errors are commented. Uncomment to catch errors.

try {
    // --> Creation of carts
//    const errorCart = new ShoppingCart(5, 555, 'ErrorSize'); //error --> creation error

    const juliaShopCart1 = new ShoppingCart('JuliaCart', 'Julia', 3),
        johnShopCart2 = new ShoppingCart('JohnCart', 'John', 3);

    //Creation of products
//    const errorProduct = new Product(true, 'Wrong description', '222'); //error --> creation error

    const xiaomiPhone1 = new Product('Redmi Note 5', {
            color: 'Black',
            size: '6 inches',
            os: 'Android 8.1'
        }, 200),
        xiaomiPhone2 = new Product('Redmi Note 5', {
            color: 'Black',
            size: '6 inches',
            os: 'Android 8.1'
        }, 200),
        samsungPhone1 = new Product('Samsung S9+', {
            color: 'Coral Blue',
            size: '6.2 inches',
            os: 'Android 8.0'
        }, 710),
        samsungPhone2 = new Product('Samsung S9+', {
            color: 'Coral Blue',
            size: '6.2 inches',
            os: 'Android 8.0'
        }, 710),
        iPhone = new Product('iPhone XS Max', {
            color: 'Silver',
            size: '6.5 inches',
            os: 'iOS 12'
        }, 1450);

//    console.table(juliaShopCart1.getFormattedListOfProducts()); //error --> empty formatted list

    //Add products
    juliaShopCart1
        .addNewProduct(xiaomiPhone1)
        .addNewProduct(xiaomiPhone2)
        .addNewProduct(samsungPhone1)
        .addNewProduct(samsungPhone2);

//    juliaShopCart1.addNewProduct('Instance error.'); //error --> instance error

    juliaShopCart1.addNewProduct(iPhone);

    johnShopCart2
        .addNewProduct(samsungPhone2)
        .addNewProduct(xiaomiPhone1);

//    johnShopCart2.addNewProduct(xiaomiPhone1); //error --> same product has been put twice

    //Remove products
//    johnShopCart2.removeProduct(samsungPhone1); // error --> delete Julia's phone from JohnCart

    johnShopCart2
        .removeProduct(samsungPhone2)
        .removeProduct(xiaomiPhone1);

//    johnShopCart2.removeProduct(xiaomiPhone1); //error --> nothing to delete

    //Set price
//    xiaomiPhone1.setPrice(180); //error --> lower new price
//    xiaomiPhone1.setPrice('222'); //error --> not a number
    xiaomiPhone1.setPrice(250);

    //Get new price
    console.log(`xiaomiPhone1 new price: ${xiaomiPhone1.getPrice()}`);

    //AveragePrice
    console.log(`juliaShopCart1 average price: ${juliaShopCart1.getAveragePrice()}`);
//    console.log(`johnShopCart2 average price: ${johnShopCart2.getAveragePrice()}`); //error --> empty cart

    //TotalPrice
    console.log(`juliaShopCart1 total price: ${juliaShopCart1.getTotalPrice()}`);
//    console.log(`johnShopCart2 total price: ${johnShopCart2.getTotalPrice()}`); //error --> empty cart

    //Formatted
    console.table(juliaShopCart1.getFormattedListOfProducts());
//    console.table(johnShopCart2.getFormattedListOfProducts()); //error --> empty cart

    //History
    console.table(juliaShopCart1.getHistory());
    console.table(johnShopCart2.getHistory());
} catch (e) {
    console.error(e);
}