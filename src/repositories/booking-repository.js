const { StatusCodes } = require('http-status-codes');

const { Booking } = require('../models');
const CrudRepository = require('./crud-repository');

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data, transaction) {
        const response = await Booking.create(data, {transaction: transaction});
        return response;
    }

    async get(data, transaction) {
        const response = await this.model.findByPk(data, {transaction: transaction});
        if(!response) {
            throw new AppError('Resource Not Found', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async update(id, data, transaction) { // data -> {col: value, ...}
        const [affectedRows] = await this.model.update(data, {
            where: {
                id: id
            }
        }, {transaction: transaction});
        if(affectedRows === 0) {
            throw new AppError('Resource Not Found', StatusCodes.NOT_FOUND);
        }

        const updatedRecord = await this.model.findByPk(id);
        return updatedRecord;
    }
}

module.exports = BookingRepository;