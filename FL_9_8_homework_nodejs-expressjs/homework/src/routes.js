const handlers = require('./handlers/car');

module.exports = app => {
    app.route('/car')
        .post(handlers.car_postHandler)
        .get(handlers.car_getHandler);

    app.route('/car/:id')
        .get(handlers.car_id_getHandler)
        .put(handlers.car_id_putHandler)
        .delete(handlers.car_id_deleteHandler);
};