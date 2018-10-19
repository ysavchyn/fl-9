'use strict';

const fs = require('fs');
let cars = {};

const sortByProperty = property => {
    return (x, y) => {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};

const writeJsonToFile = (location, json) => {
    fs.writeFile(location, JSON.stringify(json, null, 4), function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('The file has been saved.');
    });
};

const nullUnderfinedCheck = value => {
    return value !== null && value !== undefined;
}

fs.readFile('../db/data.json', (err, data) => {
    if (err) {
        return console.error(err);
    }
    cars = JSON.parse(data);
});

module.exports = {

    car_postHandler: (req, res) => {
        for (let i = 0; i < cars.length; i++) {
            if (cars[i].id === Number(req.body.id)) {
                return res.status(409).json({
                    "message": "Car already exists."
                });
            }
        }

        let newCar = {
            id: Number(req.body.id),
            brand: req.body.brand,
            model: req.body.model,
            engineVolume: Number(req.body.engineVolume),
            year: Number(req.body.year)
        };

        cars.push(newCar);
        cars.sort(sortByProperty('id'));
        writeJsonToFile('../db/data.json', cars);

        return res.status(201).json(newCar);
    },

    car_getHandler: (req, res) => {
        res.status(200).json(cars);
    },

    car_id_getHandler: (req, res) => {
        for (let i = 0; i < cars.length; i++) {
            if (cars[i].id === Number(req.params.id)) {
                return res.status(200).json(cars[i]);
            }
        }

        return res.status(404).json({
            "message": "Not Found."
        });
    },

    car_id_putHandler: (req, res) => {
        for (let i = 0; i < cars.length; i++) {
            if (cars[i].id === Number(req.params.id)) {
                if (nullUnderfinedCheck(req.body.brand)) {
                    cars[i].brand = req.body.brand;
                }
                if (nullUnderfinedCheck(req.body.model)) {
                    cars[i].model = req.body.model;
                }
                if (nullUnderfinedCheck(req.body.engineVolume)) {
                    cars[i].engineVolume = Number(req.body.engineVolume);
                }
                if (nullUnderfinedCheck(req.body.year)) {
                    cars[i].year = Number(req.body.year);
                }
                writeJsonToFile('../db/data.json', cars);

                return res.status(200).json(cars[i]);
            }
        }

        return res.status(404).json({
            "message": "Such id hasn\'t been found."
        });
    },

    car_id_deleteHandler: (req, res) => {
        for (let i = 0; i < cars.length; i++) {
            if (cars[i].id == Number(req.params.id)) {
                cars.splice(i, 1);
                writeJsonToFile('../db/data.json', cars);

                return res.status(200).json({
                    "message": "The car has been successfully removed"
                });
            }
        }

        return res.status(404).json({
            "message": "Not Found."
        });
    }

};